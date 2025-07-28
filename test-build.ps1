# 本地构建测试脚本
Write-Host "=== 本地构建测试 ===" -ForegroundColor Cyan

# 设置环境变量
$env:GITHUB_PAGES = "true"
$env:NODE_ENV = "production"

Write-Host "环境变量设置:" -ForegroundColor Yellow
Write-Host "NODE_ENV: $env:NODE_ENV"
Write-Host "GITHUB_PAGES: $env:GITHUB_PAGES"

# 清理之前的构建
Write-Host "`n清理之前的构建..." -ForegroundColor Yellow
if (Test-Path "out") {
    Remove-Item -Recurse -Force "out"
    Write-Host "✅ 删除了 out 目录"
}
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ 删除了 .next 目录"
}

# 检查配置文件
Write-Host "`n检查配置文件..." -ForegroundColor Yellow
if (Test-Path "next.config.ts") {
    Write-Host "✅ next.config.ts 存在"
} else {
    Write-Host "❌ next.config.ts 不存在" -ForegroundColor Red
    exit 1
}

# 检查 posts 目录
Write-Host "`n检查 posts 目录..." -ForegroundColor Yellow
if (Test-Path "posts") {
    Write-Host "✅ posts 目录存在"
    $postCount = (Get-ChildItem "posts" -Filter "*.md").Count
    Write-Host "📝 找到 $postCount 个 Markdown 文件"
} else {
    Write-Host "❌ posts 目录不存在" -ForegroundColor Red
}

# 运行构建
Write-Host "`n开始构建..." -ForegroundColor Yellow
try {
    npm run build:github
    $buildExitCode = $LASTEXITCODE
    Write-Host "构建命令退出码: $buildExitCode"
    
    if ($buildExitCode -eq 0) {
        Write-Host "✅ 构建成功" -ForegroundColor Green
    } else {
        Write-Host "❌ 构建失败" -ForegroundColor Red
        exit $buildExitCode
    }
} catch {
    Write-Host "❌ 构建过程中出现异常: $_" -ForegroundColor Red
    exit 1
}

# 检查构建输出
Write-Host "`n检查构建输出..." -ForegroundColor Yellow

if (Test-Path ".next") {
    Write-Host "✅ .next 目录存在"
    $nextSize = (Get-ChildItem ".next" -Recurse | Measure-Object -Property Length -Sum).Sum
    Write-Host "📁 .next 目录大小: $([math]::Round($nextSize/1MB, 2)) MB"
} else {
    Write-Host "❌ .next 目录不存在" -ForegroundColor Red
}

if (Test-Path "out") {
    Write-Host "✅ out 目录存在" -ForegroundColor Green
    $outSize = (Get-ChildItem "out" -Recurse | Measure-Object -Property Length -Sum).Sum
    Write-Host "📁 out 目录大小: $([math]::Round($outSize/1MB, 2)) MB"
    
    # 检查关键文件
    if (Test-Path "out/index.html") {
        Write-Host "✅ index.html 存在" -ForegroundColor Green
    } else {
        Write-Host "❌ index.html 不存在" -ForegroundColor Red
    }
    
    # 列出所有 HTML 文件
    $htmlFiles = Get-ChildItem "out" -Recurse -Filter "*.html"
    Write-Host "📄 找到 $($htmlFiles.Count) 个 HTML 文件:"
    $htmlFiles | ForEach-Object { Write-Host "  - $($_.FullName.Replace((Get-Location).Path, '.'))" }
    
} else {
    Write-Host "❌ out 目录不存在 - 静态导出失败!" -ForegroundColor Red
    Write-Host "这表明 Next.js 没有进行静态导出" -ForegroundColor Red
}

Write-Host "`n=== 构建测试完成 ===" -ForegroundColor Cyan
