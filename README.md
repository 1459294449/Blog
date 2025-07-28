# 技术博客 - 现代技术博客平台

使用 Next.js 15、TypeScript 和 Tailwind CSS 构建的快速、现代化技术博客。针对性能、SEO 和开发者体验进行优化，支持 GitHub Pages 和 Vercel 部署。

## ✨ 特性

- **⚡ 极速加载**: 静态站点生成，性能最优
- **📱 响应式设计**: 移动优先设计，适配所有设备
- **🎨 现代 UI**: 简洁专业的设计，支持深色模式
- **📝 Markdown 支持**: 使用 Markdown 编写内容，支持语法高亮
- **🔍 SEO 优化**: 内置 SEO 优化，包含元标签和结构化数据
- **🚀 轻松部署**: 一键部署到 GitHub Pages 或 Vercel
- **🛠️ 开发者友好**: TypeScript、ESLint 和现代开发工具
- **📊 性能专注**: 针对 Core Web Vitals 优化

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd tech-blog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tech-blog/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── posts/[id]/     # Dynamic post pages
│   │   ├── about/          # About page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable React components
│   │   ├── Header.tsx      # Site header
│   │   ├── Footer.tsx      # Site footer
│   │   └── PostCard.tsx    # Blog post card
│   └── lib/               # Utility functions
│       └── markdown.ts    # Markdown processing
├── posts/                 # Blog posts (Markdown files)
├── public/               # Static assets
├── .github/workflows/    # GitHub Actions
└── docs/                # Documentation
```

## ✍️ Writing Content

### Creating a New Post

1. Create a new Markdown file in the `posts/` directory:
   ```bash
   touch posts/my-new-post.md
   ```

2. Add frontmatter and content:
   ```markdown
   ---
   title: "My New Post"
   date: "2024-07-24"
   excerpt: "A brief description of the post"
   tags: ["nextjs", "typescript", "web-development"]
   author: "Your Name"
   ---

   # My New Post

   Your content here...
   ```

### Frontmatter Fields

- `title`: Post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `excerpt`: Brief description for SEO and post listings
- `tags`: Array of tags for categorization
- `author`: Author name

### Markdown Features

- **Headers**: Use `#`, `##`, `###` for headings
- **Code blocks**: Use triple backticks with language specification
- **Links**: `[text](url)`
- **Images**: `![alt text](image-url)`
- **Lists**: Use `-` or `1.` for lists
- **Emphasis**: `*italic*` and `**bold**`

## 🎨 Customization

### Styling

The blog uses Tailwind CSS for styling. Key files:

- `src/app/globals.css`: Global styles and typography
- `tailwind.config.js`: Tailwind configuration
- Component files: Individual component styles

### Configuration

- `next.config.ts`: Next.js configuration
- `tsconfig.json`: TypeScript configuration
- `package.json`: Dependencies and scripts

### Branding

Update the following to customize branding:

1. **Site title and description**: `src/app/layout.tsx`
2. **Header**: `src/components/Header.tsx`
3. **Footer**: `src/components/Footer.tsx`
4. **About page**: `src/app/about/page.tsx`

## 🚀 Deployment

### GitHub Pages

1. **Enable GitHub Pages** in repository settings
2. **Push to main branch** - automatic deployment via GitHub Actions
3. **Access your site** at `https://username.github.io/repository-name`

### Vercel

1. **Connect repository** to Vercel
2. **Configure build settings**:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
3. **Deploy** - automatic deployment on push

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Deployment
npm run export       # Build static export
npm run deploy:github # Build for GitHub Pages
npm run deploy:vercel # Build for Vercel
```

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (via ESLint)

## 📊 Performance

This blog is optimized for performance:

- **Static Site Generation**: Pre-rendered HTML
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Optimized for static export
- **Minimal JavaScript**: Only essential JS loaded
- **CDN Ready**: Works with global CDNs

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Deployment Issues**:
   - Ensure repository settings are correct
   - Check GitHub Actions logs
   - Verify environment variables

3. **Styling Issues**:
   - Check Tailwind CSS configuration
   - Verify CSS imports
   - Check for conflicting styles

### Getting Help

- Check the [Issues](https://github.com/your-username/tech-blog/issues) page
- Review [Next.js Documentation](https://nextjs.org/docs)
- See [Deployment Guide](DEPLOYMENT.md)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Remark](https://remark.js.org) - Markdown processor
- [Vercel](https://vercel.com) - Deployment platform
- [GitHub Pages](https://pages.github.com) - Static hosting

---

Built with ❤️ using modern web technologies. Happy blogging!
