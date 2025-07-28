# Git 提交助手脚本
# 使用方法: .\scripts\commit-helper.ps1

param(
    [Parameter(Mandatory=$false)]
    [string]$Type,
    
    [Parameter(Mandatory=$false)]
    [string]$Scope,
    
    [Parameter(Mandatory=$false)]
    [string]$Message,
    
    [Parameter(Mandatory=$false)]
    [switch]$Quick
)

# 颜色定义
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$Cyan = "Cyan"

function Show-Header {
    Write-Host "🚀 Git 提交助手" -ForegroundColor $Cyan
    Write-Host "================" -ForegroundColor $Cyan
    Write-Host ""
}

function Show-CommitTypes {
    Write-Host "📋 提交类型:" -ForegroundColor $Yellow
    Write-Host "  feat     ✨ 新功能、新文章"
    Write-Host "  fix      🐛 Bug修复"
    Write-Host "  docs     📝 文档更新"
    Write-Host "  style    💄 样式调整、UI改进"
    Write-Host "  refactor ♻️  代码重构"
    Write-Host "  perf     ⚡ 性能优化"
    Write-Host "  build    👷 构建系统、依赖更新"
    Write-Host "  ci       💚 CI/CD 配置"
    Write-Host "  chore    🔧 其他杂项"
    Write-Host ""
}

function Show-Scopes {
    Write-Host "🎯 范围选项:" -ForegroundColor $Yellow
    Write-Host "  content  - 文章内容"
    Write-Host "  ui       - 用户界面"
    Write-Host "  config   - 配置文件"
    Write-Host "  deploy   - 部署相关"
    Write-Host "  docs     - 文档"
    Write-Host "  perf     - 性能"
    Write-Host "  seo      - SEO优化"
    Write-Host ""
}

function Get-GitStatus {
    Write-Host "📊 当前 Git 状态:" -ForegroundColor $Blue
    git status --short
    Write-Host ""
}

function Get-CommitType {
    if ($Type) { return $Type }
    
    Show-CommitTypes
    do {
        $input = Read-Host "请选择提交类型 (feat/fix/docs/style/refactor/perf/build/ci/chore)"
        if ($input -in @("feat", "fix", "docs", "style", "refactor", "perf", "build", "ci", "chore")) {
            return $input
        }
        Write-Host "❌ 无效的提交类型，请重新选择" -ForegroundColor $Red
    } while ($true)
}

function Get-CommitScope {
    if ($Scope) { return $Scope }
    
    Show-Scopes
    $input = Read-Host "请输入范围 (可选，直接回车跳过)"
    return $input
}

function Get-CommitMessage {
    if ($Message) { return $Message }
    
    do {
        $input = Read-Host "请输入简短描述 (不超过50字符)"
        if ($input.Length -le 50 -and $input.Length -gt 0) {
            return $input
        }
        Write-Host "❌ 描述长度应在1-50字符之间" -ForegroundColor $Red
    } while ($true)
}

function Get-DetailedDescription {
    Write-Host ""
    Write-Host "📝 详细说明 (可选):" -ForegroundColor $Yellow
    Write-Host "请输入详细说明，每行一个要点，空行结束:"
    
    $details = @()
    do {
        $line = Read-Host "- "
        if ($line) {
            $details += "- $line"
        }
    } while ($line)
    
    return $details
}

function Get-FileChanges {
    Write-Host ""
    Write-Host "📁 文件变更说明 (可选):" -ForegroundColor $Yellow
    Write-Host "请描述主要的文件变更，空行结束:"
    
    $changes = @()
    do {
        $line = Read-Host "  "
        if ($line) {
            $changes += "- $line"
        }
    } while ($line)
    
    return $changes
}

function Build-CommitMessage {
    param($Type, $Scope, $Message, $Details, $Changes)
    
    # 构建第一行
    $firstLine = if ($Scope) { "$Type($Scope): $Message" } else { "$Type: $Message" }
    
    # 构建完整消息
    $commitMsg = @($firstLine)
    
    if ($Details.Count -gt 0) {
        $commitMsg += ""
        $commitMsg += "详细说明:"
        $commitMsg += $Details
    }
    
    if ($Changes.Count -gt 0) {
        $commitMsg += ""
        $commitMsg += "文件变更:"
        $commitMsg += $Changes
    }
    
    # 添加元信息
    $commitMsg += ""
    $commitMsg += "影响范围: [需要填写]"
    $commitMsg += "测试状态: [需要填写]"
    
    return $commitMsg -join "`n"
}

function Show-Preview {
    param($CommitMessage)
    
    Write-Host ""
    Write-Host "👀 提交信息预览:" -ForegroundColor $Green
    Write-Host "==================" -ForegroundColor $Green
    Write-Host $CommitMessage
    Write-Host "==================" -ForegroundColor $Green
    Write-Host ""
}

function Confirm-Commit {
    $confirm = Read-Host "确认提交? (y/N)"
    return $confirm -eq "y" -or $confirm -eq "Y"
}

# 快速提交模式
if ($Quick) {
    if (-not $Type -or -not $Message) {
        Write-Host "❌ 快速模式需要指定 -Type 和 -Message 参数" -ForegroundColor $Red
        Write-Host "示例: .\scripts\commit-helper.ps1 -Quick -Type feat -Scope content -Message '添加新文章'"
        exit 1
    }
    
    $firstLine = if ($Scope) { "$Type($Scope): $Message" } else { "$Type: $Message" }
    git add .
    git commit -m $firstLine
    Write-Host "✅ 快速提交完成!" -ForegroundColor $Green
    exit 0
}

# 交互式模式
Show-Header
Get-GitStatus

# 检查是否有变更
$status = git status --porcelain
if (-not $status) {
    Write-Host "ℹ️  没有检测到文件变更" -ForegroundColor $Yellow
    exit 0
}

# 收集提交信息
$commitType = Get-CommitType
$commitScope = Get-CommitScope
$commitMessage = Get-CommitMessage
$details = Get-DetailedDescription
$changes = Get-FileChanges

# 构建提交信息
$fullCommitMessage = Build-CommitMessage $commitType $commitScope $commitMessage $details $changes

# 预览和确认
Show-Preview $fullCommitMessage

if (Confirm-Commit) {
    # 添加所有变更
    git add .
    
    # 提交
    $tempFile = [System.IO.Path]::GetTempFileName()
    $fullCommitMessage | Out-File -FilePath $tempFile -Encoding UTF8
    
    try {
        git commit -F $tempFile
        Write-Host ""
        Write-Host "✅ 提交成功!" -ForegroundColor $Green
        Write-Host ""
        Write-Host "🚀 下一步操作:" -ForegroundColor $Cyan
        Write-Host "  git push origin master  # 推送到远程仓库"
        Write-Host "  git tag v1.x.x          # 创建版本标签"
    }
    catch {
        Write-Host "❌ 提交失败: $_" -ForegroundColor $Red
    }
    finally {
        Remove-Item $tempFile -ErrorAction SilentlyContinue
    }
} else {
    Write-Host "❌ 提交已取消" -ForegroundColor $Yellow
}

Write-Host ""
Write-Host "💡 提示: 使用 -Quick 参数可以快速提交" -ForegroundColor $Blue
Write-Host "示例: .\scripts\commit-helper.ps1 -Quick -Type fix -Message '修复样式问题'"
