# 更新 Git 学习文章中的图片路径
# 使用方法: .\scripts\update-git-images.ps1

$markdownFile = "posts\git学习之路.md"

Write-Host "🔄 开始更新图片路径..." -ForegroundColor Cyan

# 检查文件是否存在
if (-not (Test-Path $markdownFile)) {
    Write-Host "❌ Markdown 文件不存在: $markdownFile" -ForegroundColor Red
    exit 1
}

# 读取文件内容
$content = Get-Content $markdownFile -Raw

# 图片路径映射
$imageMap = @{
    "image-20250726151327333.png" = "查看版本 git -v"
    "image-20250726153914086.png" = "Git 工作区域图"
    "image-20250726154458470.png" = "文件状态关系图"
    "image-20250726155028345.png" = "Git 状态示例"
    "image-20250728132534451.png" = "远程仓库连接"
    "image-20250726170757819.png" = "版本回退示例"
    "image-20250726173129072.png" = "Git diff 示例"
    "image-20250727212719888.png" = "Git 分支概念图"
    "image-20250727213713285.png" = "分支冲突示例"
    "image-20250727214435455.png" = "Rebase 前的分支状态"
    "image-20250727214626666.png" = "Rebase 后的分支状态"
    "image-20250727214737037.png" = "Main 分支 Rebase"
    "image-20250727220058693.png" = "Git 工作流对比"
    "image-20250727220210569.png" = "GitFlow 工作流"
    "image-20250727220504235.png" = "GitHub Flow"
    "image-20250727220623920.png" = "GitHub Flow 详细流程"
}

# 在适当位置插入图片引用
$updates = @(
    @{
        "after" = "查看版本 git -v"
        "image" = "image-20250726151327333.png"
        "alt" = "Git 版本查看"
    },
    @{
        "after" = "####工作区域"
        "image" = "image-20250726153914086.png"
        "alt" = "Git 工作区域图"
    },
    @{
        "after" = "图中形象表明了各种文件状态之间的关系。"
        "image" = "image-20250726154458470.png"
        "alt" = "文件状态关系图"
    },
    @{
        "after" = "git status"
        "image" = "image-20250726155028345.png"
        "alt" = "Git 状态示例"
    },
    @{
        "after" = "与远程仓库的连接不正确，执行git remote 命令。"
        "image" = "image-20250728132534451.png"
        "alt" = "远程仓库连接"
    },
    @{
        "after" = "git reset --hard HEAD~1"
        "image" = "image-20250726170757819.png"
        "alt" = "版本回退示例"
    },
    @{
        "after" = "#### 4.git diff"
        "image" = "image-20250726173129072.png"
        "alt" = "Git diff 示例"
    },
    @{
        "after" = "分支是 Git 提供的一种功能，它允许你在开发过程中创建多个平行的开发路线。"
        "image" = "image-20250727212719888.png"
        "alt" = "Git 分支概念图"
    },
    @{
        "after" = "以下就是遇到分支冲突的情况，这是因为不同的分支对同一个文件进行了修改，导致git不知道该保留哪个冲突。"
        "image" = "image-20250727213713285.png"
        "alt" = "分支冲突示例"
    },
    @{
        "after" = "如果有这样的分支"
        "image" = "image-20250727214435455.png"
        "alt" = "Rebase 前的分支状态"
    },
    @{
        "after" = "如果在dev分支上执行rebase操作的话，dev上的提交会变基到main分支上。如下图所示"
        "image" = "image-20250727214626666.png"
        "alt" = "Rebase 后的分支状态"
    },
    @{
        "after" = "如果在吗，main分支上，执行rebase会成为这样，"
        "image" = "image-20250727214737037.png"
        "alt" = "Main 分支 Rebase"
    },
    @{
        "after" = "### 工作流"
        "image" = "image-20250727220058693.png"
        "alt" = "Git 工作流对比"
    },
    @{
        "after" = "gitflow"
        "image" = "image-20250727220210569.png"
        "alt" = "GitFlow 工作流"
    },
    @{
        "after" = "githubflow"
        "image" = "image-20250727220504235.png"
        "alt" = "GitHub Flow"
    }
)

foreach ($update in $updates) {
    $afterText = $update.after
    $imageName = $update.image
    $altText = $update.alt
    $imagePath = "/Blog/images/git-guide/$imageName"
    $imageMarkdown = "`n`n![$altText]($imagePath)`n"
    
    if ($content -match [regex]::Escape($afterText)) {
        $content = $content -replace [regex]::Escape($afterText), "$afterText$imageMarkdown"
        Write-Host "✅ 添加图片: $imageName" -ForegroundColor Green
    }
}

# 写回文件
$content | Set-Content $markdownFile -Encoding UTF8

Write-Host "`n🎉 图片路径更新完成！" -ForegroundColor Green
