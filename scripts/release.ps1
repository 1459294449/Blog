# 版本发布脚本
# 使用方法: .\scripts\release.ps1 -Version "1.1.0" -Type "minor"

param(
    [Parameter(Mandatory=$true)]
    [string]$Version,
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("major", "minor", "patch")]
    [string]$Type = "patch",
    
    [Parameter(Mandatory=$false)]
    [switch]$DryRun
)

# 颜色定义
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$Cyan = "Cyan"

function Show-Header {
    Write-Host "🚀 版本发布助手" -ForegroundColor $Cyan
    Write-Host "================" -ForegroundColor $Cyan
    Write-Host ""
}

function Test-GitClean {
    $status = git status --porcelain
    if ($status) {
        Write-Host "❌ 工作目录不干净，请先提交所有变更" -ForegroundColor $Red
        git status
        return $false
    }
    return $true
}

function Test-OnMaster {
    $branch = git rev-parse --abbrev-ref HEAD
    if ($branch -ne "master") {
        Write-Host "❌ 请在 master 分支上执行发布" -ForegroundColor $Red
        Write-Host "当前分支: $branch" -ForegroundColor $Yellow
        return $false
    }
    return $true
}

function Get-CurrentVersion {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    return $packageJson.version
}

function Update-PackageVersion {
    param($NewVersion)
    
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    $packageJson.version = $NewVersion
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    
    Write-Host "✅ 更新 package.json 版本: $NewVersion" -ForegroundColor $Green
}

function Update-Changelog {
    param($Version, $Date)
    
    $changelogPath = "CHANGELOG.md"
    $content = Get-Content $changelogPath
    
    # 找到 [未发布] 部分并替换
    $newContent = @()
    $inUnreleased = $false
    $addedVersion = $false
    
    foreach ($line in $content) {
        if ($line -match "## \[未发布\]") {
            $newContent += $line
            $newContent += ""
            $newContent += "### 计划中"
            $newContent += "- 待定功能"
            $newContent += ""
            $newContent += "## [$Version] - $Date"
            $addedVersion = $true
            $inUnreleased = $true
        }
        elseif ($line -match "^## \[" -and $addedVersion) {
            $inUnreleased = $false
            $newContent += $line
        }
        elseif (-not $inUnreleased -or $line -notmatch "^### 计划中" -and $line -notmatch "^- ") {
            $newContent += $line
        }
    }
    
    $newContent | Set-Content $changelogPath
    Write-Host "✅ 更新 CHANGELOG.md" -ForegroundColor $Green
}

function Build-Project {
    Write-Host "🔨 构建项目..." -ForegroundColor $Blue
    
    try {
        npm run build
        Write-Host "✅ 项目构建成功" -ForegroundColor $Green
        return $true
    }
    catch {
        Write-Host "❌ 项目构建失败: $_" -ForegroundColor $Red
        return $false
    }
}

function Create-GitTag {
    param($Version, $Message)
    
    git add .
    git commit -m "chore(release): 发布版本 v$Version

详细说明:
- 更新版本号到 v$Version
- 更新 CHANGELOG.md
- 准备发布到 GitHub Pages

文件变更:
- 修改: package.json (版本号)
- 修改: CHANGELOG.md (发布记录)

影响范围: 配置
版本: v$Version
测试状态: 已测试"

    git tag -a "v$Version" -m "Release v$Version

$Message"
    
    Write-Host "✅ 创建 Git 标签: v$Version" -ForegroundColor $Green
}

function Push-Release {
    param($Version)
    
    Write-Host "📤 推送到远程仓库..." -ForegroundColor $Blue
    
    git push origin master
    git push origin "v$Version"
    
    Write-Host "✅ 推送完成" -ForegroundColor $Green
}

function Show-ReleaseInfo {
    param($Version, $CurrentVersion)
    
    Write-Host ""
    Write-Host "📋 发布信息:" -ForegroundColor $Yellow
    Write-Host "  当前版本: $CurrentVersion"
    Write-Host "  新版本:   $Version"
    Write-Host "  发布类型: $Type"
    Write-Host "  发布日期: $(Get-Date -Format 'yyyy-MM-dd')"
    Write-Host ""
}

function Show-PostReleaseSteps {
    param($Version)
    
    Write-Host ""
    Write-Host "🎉 发布完成! v$Version" -ForegroundColor $Green
    Write-Host ""
    Write-Host "📋 后续步骤:" -ForegroundColor $Cyan
    Write-Host "1. 访问 GitHub 仓库检查 Actions 部署状态"
    Write-Host "2. 在 GitHub 上创建 Release 页面:"
    Write-Host "   https://github.com/你的用户名/tech-blog/releases/new"
    Write-Host "3. 验证网站更新:"
    Write-Host "   https://你的用户名.github.io/tech-blog/"
    Write-Host "4. 分享新版本给用户"
    Write-Host ""
}

# 主流程
Show-Header

# 预检查
if (-not (Test-GitClean)) { exit 1 }
if (-not (Test-OnMaster)) { exit 1 }

$currentVersion = Get-CurrentVersion
Show-ReleaseInfo $Version $currentVersion

# 确认发布
if (-not $DryRun) {
    $confirm = Read-Host "确认发布版本 v$Version? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "❌ 发布已取消" -ForegroundColor $Yellow
        exit 0
    }
}

# 执行发布流程
if ($DryRun) {
    Write-Host "🧪 DRY RUN 模式 - 不会实际执行操作" -ForegroundColor $Yellow
    Write-Host ""
    Write-Host "将要执行的操作:"
    Write-Host "1. 更新 package.json 版本号"
    Write-Host "2. 更新 CHANGELOG.md"
    Write-Host "3. 构建项目"
    Write-Host "4. 创建 Git 提交和标签"
    Write-Host "5. 推送到远程仓库"
    exit 0
}

try {
    # 1. 更新版本号
    Update-PackageVersion $Version
    
    # 2. 更新 CHANGELOG
    $releaseDate = Get-Date -Format "yyyy-MM-dd"
    Update-Changelog $Version $releaseDate
    
    # 3. 构建项目
    if (-not (Build-Project)) {
        throw "构建失败"
    }
    
    # 4. 创建 Git 标签
    $releaseMessage = "版本 $Version 发布

主要更新:
- 请在 CHANGELOG.md 中查看详细更新内容
- 优化性能和用户体验
- 修复已知问题

部署地址: https://你的用户名.github.io/tech-blog/"
    
    Create-GitTag $Version $releaseMessage
    
    # 5. 推送到远程
    Push-Release $Version
    
    # 显示后续步骤
    Show-PostReleaseSteps $Version
    
} catch {
    Write-Host ""
    Write-Host "❌ 发布失败: $_" -ForegroundColor $Red
    Write-Host ""
    Write-Host "🔄 回滚操作:" -ForegroundColor $Yellow
    Write-Host "  git reset --hard HEAD~1  # 撤销提交"
    Write-Host "  git tag -d v$Version     # 删除标签"
    exit 1
}

Write-Host ""
Write-Host "💡 提示:" -ForegroundColor $Blue
Write-Host "  使用 -DryRun 参数可以预览发布操作"
Write-Host "  示例: .\scripts\release.ps1 -Version '1.1.0' -Type minor -DryRun"
