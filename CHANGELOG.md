# 更新日志

所有重要的项目变更都会记录在这个文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本控制遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 计划中
- 深色模式切换功能
- 文章搜索功能
- 标签页面
- RSS 订阅
- 评论系统集成

## [1.1.0] - 2025-07-28

### 新增
- 🎨 **界面重大更新**: 全新的 Poetize 风格毛玻璃效果设计
  - 重新设计文章卡片的透明度和颜色方案
  - 优化深色/亮色模式下的视觉效果
  - 改进文章列表的视觉层次和可读性
- 🖼️ **背景图片系统**: 更新背景图片配置
  - 切换到新的背景图片 `bg3.jpg`
  - 优化图片遮罩层效果

### 改进
- 🔧 **GitHub Pages 部署优化**: 解决部署配置冲突
  - 修复 `next.config.js` 与 GitHub Actions 的兼容性问题
  - 实现动态仓库名称获取，避免硬编码路径
  - 改进构建流程的错误检测和日志输出
- 🎯 **CSS 变量系统**: 优化毛玻璃效果的 CSS 变量
  - 调整 `--glass-bg` 和 `--glass-border` 透明度值
  - 改进深色模式下的边框效果

### 技术细节
- **影响文件**:
  - `src/app/globals.css` - 毛玻璃效果样式更新
  - `src/components/BackgroundImage.tsx` - 背景图片配置
  - `next.config.js` - 动态仓库名称获取
  - `.github/workflows/deploy.yml` - 部署流程优化
- **版本类型**: 次版本更新（界面重大改进）
- **兼容性**: 向后兼容，无破坏性变更

## [1.0.3] - 2025-07-25

### 修复
- 🐛 **GitHub Pages 部署配置**: 修正项目路径配置错误
  - 将 `basePath` 和 `assetPrefix` 从 `/tech-blog` 更正为 `/Blog`
  - 解决 GitHub Pages 上资源加载失败的问题
- 🔧 **部署工作流优化**: 改进 GitHub Actions 部署流程
  - 添加 `NODE_ENV=production` 环境变量设置
  - 增加构建输出验证步骤

### 技术细节
- **影响文件**: `next.config.ts`, `.github/workflows/deploy.yml`
- **问题原因**: 项目仓库名为 `Blog.git`，但配置中使用了 `tech-blog`
- **解决方案**: 统一项目路径配置，确保与 GitHub 仓库名一致

## [1.0.0] - 2025-07-25

### 新增
- 🎉 初始化中文技术博客项目
- ✨ 完整的中文化界面和内容
- 🚀 GitHub Pages 自动部署配置
- 📝 包含 4 篇高质量中文技术文章:
  - 欢迎来到我的技术博客
  - 现代 Web 开发中的 TypeScript 最佳实践
  - 掌握 Next.js 静态站点生成，打造高性能博客
  - Claude Code 使用指南：通过 GitHub Copilot 代理使用 Claude
- 🎨 现代化响应式设计
- ⚡ 静态站点生成 (SSG) 优化
- 📱 移动端适配
- 🔍 SEO 优化配置

### 技术特性
- **框架**: Next.js 15 with App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容**: Markdown with frontmatter
- **部署**: GitHub Actions + GitHub Pages
- **性能**: 静态生成，CDN 友好

### 组件架构
- `Header.tsx` - 网站头部导航
- `Footer.tsx` - 网站底部信息
- `PostCard.tsx` - 文章卡片组件
- `layout.tsx` - 全局布局
- `page.tsx` - 首页组件

### 文件结构
```
tech-blog/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React 组件
│   └── lib/                # 工具函数
├── posts/                  # Markdown 文章
├── public/                 # 静态资源
├── .github/workflows/      # GitHub Actions
└── scripts/               # 辅助脚本
```

### 配置文件
- `next.config.ts` - Next.js 配置，支持静态导出
- `tailwind.config.js` - Tailwind CSS 配置
- `tsconfig.json` - TypeScript 配置
- `.github/workflows/deploy.yml` - 自动部署配置

### 脚本工具
- `scripts/new-post.js` - 快速创建新文章的脚本

### 文档
- `README.md` - 项目说明文档
- `DEPLOYMENT.md` - 部署指南
- `VERSION_CONTROL.md` - 版本控制指南
- `CHANGELOG.md` - 更新日志

---

## 版本说明

### 版本格式
- **主版本号**: 重大架构变更、不兼容更新
- **次版本号**: 新功能、新文章、界面改进
- **修订版本号**: Bug 修复、内容更新、小改动

### 更新类型
- `新增` - 新功能或新内容
- `修改` - 现有功能的改进
- `修复` - Bug 修复
- `删除` - 移除的功能
- `安全` - 安全相关的修复
- `废弃` - 即将移除的功能

### 影响范围
- `前端` - 用户界面相关
- `内容` - 文章和文档
- `配置` - 构建和部署配置
- `性能` - 性能优化
- `SEO` - 搜索引擎优化

---

**注意**: 这是项目的第一个正式版本，建立了完整的技术博客基础架构。
