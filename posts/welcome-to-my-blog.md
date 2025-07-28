---
title: "欢迎来到我的博客"
date: "2025-07-26"
author: "MarkChin"
excerpt: "详尽介绍这个现代化中文技术博客的项目结构、使用方式和维护指南，帮助新手快速上手博客的创建、修改和管理。"
tags: ["博客", "入门指南", "Next.js", "项目结构", "使用教程"]
---

# 欢迎来到我的博客

欢迎来到这个现代化的中文技术博客！这里将分享最新的技术趋势、开发经验和实用教程。

## 整个项目所需要的知识以及学习路径简介

### 🎯 核心技术栈

要完全理解和维护这个博客，你需要掌握以下技术：

#### 必备知识（⭐⭐⭐）
- **HTML/CSS 基础**：网页结构和样式的基础
- **JavaScript 基础**：现代 Web 开发的核心语言
- **React 基础**：组件化开发思想
- **Markdown 语法**：文章编写格式

#### 进阶知识（⭐⭐）
- **Next.js 框架**：React 的生产级框架
- **TypeScript**：类型安全的 JavaScript
- **Tailwind CSS**：实用优先的 CSS 框架
- **Git 版本控制**：代码管理和协作

#### 高级知识（⭐）
- **GitHub Actions**：自动化部署
- **静态站点生成 (SSG)**：性能优化
- **SEO 优化**：搜索引擎优化

### 📚 推荐学习路径

1. **第一阶段（1-2周）**：HTML/CSS/JavaScript 基础
2. **第二阶段（2-3周）**：React 和组件化开发
3. **第三阶段（1-2周）**：Next.js 和 TypeScript
4. **第四阶段（1周）**：Markdown 和博客维护

## 项目目录概览

```
tech-blog/
├── 📁 src/                    # 源代码目录
│   ├── 📁 app/                # Next.js App Router 页面
│   ├── 📁 components/         # 可复用组件
│   └── 📁 lib/               # 工具函数库
├── 📁 posts/                 # 博客文章 (Markdown)
├── 📁 public/                # 静态资源
├── 📁 .github/workflows/     # 自动部署配置
├── 📁 scripts/               # 辅助脚本
├── 📄 next.config.js         # Next.js 配置
├── 📄 package.json           # 项目依赖
└── 📄 README.md              # 项目说明
```

## 目录详解

### 📁 src/app/ - 页面结构
```
src/app/
├── 📄 layout.tsx             # 全局布局组件
├── 📄 page.tsx               # 首页
├── 📄 globals.css            # 全局样式
├── 📁 posts/[id]/            # 动态文章页面
│   ├── 📄 page.tsx           # 文章详情页
│   └── 📄 not-found.tsx      # 404 页面
└── 📁 about/                 # 关于页面
    └── 📄 page.tsx
```

### 📁 src/components/ - 组件库
```
src/components/
├── 📄 Header.tsx             # 网站头部导航
├── 📄 Footer.tsx             # 网站底部信息
└── 📄 PostCard.tsx           # 文章卡片组件
```

### 📁 src/lib/ - 工具函数
```
src/lib/
└── 📄 markdown.ts            # Markdown 文件处理
```

### 📁 posts/ - 文章存储
```
posts/
├── 📄 welcome.md             # 欢迎文章
├── 📄 nextjs-guide.md       # Next.js 教程
└── 📄 typescript-tips.md     # TypeScript 技巧
```

### 📁 scripts/ - 辅助工具
```
scripts/
├── 📄 new-post.js            # 创建新文章脚本
├── 📄 commit-helper.ps1      # Git 提交助手
└── 📄 release.ps1            # 版本发布脚本
```

## 添加与修改博客

### 🆕 创建新文章

#### 方法一：使用脚本（推荐）
```bash
# 运行创建文章脚本
node scripts/new-post.js

# 按提示输入：
# - 文章标题
# - 文章摘要  
# - 标签
# - 作者
```

#### 方法二：手动创建
1. 在 `posts/` 目录下创建新的 `.md` 文件
2. 文件名格式：`your-article-title.md`
3. 添加 frontmatter 头部信息：

```markdown
---
title: "你的文章标题"
date: "2025-07-26"
author: "MarkChin"
excerpt: "文章简介，会显示在首页卡片上"
tags: ["标签1", "标签2", "标签3"]
---

# 你的文章标题

这里开始写正文内容...
```

### ✏️ 修改现有文章

#### 修改标题
```markdown
---
title: "新的文章标题"  # 修改这里
date: "2025-07-26"
# ... 其他不变
---
```

#### 修改简介
```markdown
---
title: "文章标题"
excerpt: "新的文章简介"  # 修改这里
# ... 其他不变
---
```

#### 修改标签
```markdown
---
tags: ["新标签1", "新标签2"]  # 修改这里
# ... 其他不变
---
```

#### 修改正文
直接编辑 `---` 分隔符下方的 Markdown 内容。

### 🗑️ 删除文章
直接删除 `posts/` 目录下对应的 `.md` 文件即可。

## 修改界面

### 🎨 修改网站标题和描述
编辑 `src/app/layout.tsx`：
```typescript
export const metadata: Metadata = {
  title: '你的博客名称',           # 修改网站标题
  description: '你的博客描述',     # 修改网站描述
}
```

### 🧭 修改导航菜单
编辑 `src/components/Header.tsx`：
```typescript
// 找到导航链接部分
<Link href="/about">关于我</Link>     # 修改菜单文字
<Link href="/contact">联系我</Link>   # 添加新菜单
```

### 🏠 修改首页内容
编辑 `src/app/page.tsx`：
```typescript
<h1>欢迎来到技术博客</h1>          # 修改首页标题
<p>探索现代 Web 开发...</p>        # 修改首页描述
```

### 👤 修改关于页面
编辑 `src/app/about/page.tsx`，更新个人信息和介绍。

### 🎨 修改样式和颜色
编辑 `src/app/globals.css`，使用 Tailwind CSS 类名调整样式。

## 便捷维护

### 🚀 快速部署
```bash
# 提交更改
git add .
git commit -m "feat(content): 添加新文章"
git push origin master

# 自动部署到 GitHub Pages
# 访问: https://你的用户名.github.io/Blog/
```

### 🔧 使用辅助脚本

#### Git 提交助手
```powershell
# 交互式提交
.\scripts\commit-helper.ps1

# 快速提交
.\scripts\commit-helper.ps1 -Quick -Type feat -Message "添加新文章"
```

#### 版本发布
```powershell
# 发布新版本
.\scripts\release.ps1 -Version "1.1.0" -Type minor
```

### 📊 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 🔍 常用命令
```bash
# 构建生产版本
npm run build

# 代码检查
npm run lint

# GitHub Pages 部署构建
npm run build:github
```

### 📝 文章编写技巧

1. **使用 Markdown 语法**：
   - `# 标题` - 一级标题
   - `## 子标题` - 二级标题
   - `**粗体**` - 粗体文字
   - `*斜体*` - 斜体文字
   - `` `代码` `` - 行内代码

2. **添加代码块**：
   ```javascript
   // 使用三个反引号包围代码
   console.log('Hello World!');
   ```

3. **插入链接**：
   ```markdown
   [链接文字](https://example.com)
   ```

4. **插入图片**：
   ```markdown
   ![图片描述](图片路径)
   ```

### 🛠️ 故障排除

#### 常见问题
1. **文章不显示**：检查 frontmatter 格式是否正确
2. **样式异常**：清除浏览器缓存，重启开发服务器
3. **部署失败**：查看 GitHub Actions 日志

#### 获取帮助
- 查看项目 README.md
- 检查 GitHub Issues
- 参考 Next.js 官方文档

---

现在你已经掌握了这个博客系统的完整使用方法！开始创作你的第一篇技术文章吧！🚀
