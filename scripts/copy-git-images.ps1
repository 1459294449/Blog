# 复制 Git 学习文章的图片
# 使用方法: .\scripts\copy-git-images.ps1

$sourceDir = "C:\Users\Mark Chin\AppData\Roaming\Typora\typora-user-images"
$targetDir = "public\images\git-guide"

# 需要复制的图片列表
$images = @(
    "image-20250726151327333.png",
    "image-20250726153914086.png", 
    "image-20250726154458470.png",
    "image-20250726155028345.png",
    "image-20250728132534451.png",
    "image-20250726170757819.png",
    "image-20250726173129072.png",
    "image-20250727212719888.png",
    "image-20250727213713285.png",
    "image-20250727214435455.png",
    "image-20250727214626666.png",
    "image-20250727214737037.png",
    "image-20250727220058693.png",
    "image-20250727220210569.png",
    "image-20250727220504235.png",
    "image-20250727220623920.png"
)

Write-Host "🖼️ 开始复制 Git 学习文章图片..." -ForegroundColor Cyan

# 检查源目录是否存在
if (-not (Test-Path $sourceDir)) {
    Write-Host "❌ 源目录不存在: $sourceDir" -ForegroundColor Red
    Write-Host "请检查 Typora 图片目录路径是否正确" -ForegroundColor Yellow
    exit 1
}

# 确保目标目录存在
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    Write-Host "✅ 创建目标目录: $targetDir" -ForegroundColor Green
}

$copiedCount = 0
$notFoundCount = 0

foreach ($image in $images) {
    $sourcePath = Join-Path $sourceDir $image
    $targetPath = Join-Path $targetDir $image
    
    if (Test-Path $sourcePath) {
        try {
            Copy-Item $sourcePath $targetPath -Force
            Write-Host "✅ 复制成功: $image" -ForegroundColor Green
            $copiedCount++
        }
        catch {
            Write-Host "❌ 复制失败: $image - $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "⚠️ 文件不存在: $image" -ForegroundColor Yellow
        $notFoundCount++
    }
}

Write-Host "`n📊 复制完成统计:" -ForegroundColor Cyan
Write-Host "✅ 成功复制: $copiedCount 个文件" -ForegroundColor Green
Write-Host "⚠️ 未找到: $notFoundCount 个文件" -ForegroundColor Yellow

if ($copiedCount -gt 0) {
    Write-Host "`n🎉 图片复制完成！现在可以更新 Markdown 文件中的图片路径了。" -ForegroundColor Green
}
