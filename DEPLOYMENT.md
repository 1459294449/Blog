# Deployment Guide

This technical blog supports deployment to both GitHub Pages and Vercel. Both platforms offer excellent performance and reliability for static sites.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git repository hosted on GitHub

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the main branch.

#### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Configure Repository Settings**:
   - Ensure the repository is public (or you have GitHub Pro for private repos)
   - The workflow file is already included at `.github/workflows/deploy.yml`

3. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Access Your Site**:
   - Your site will be available at: `https://[username].github.io/[repository-name]`
   - Check the Actions tab to monitor deployment progress

#### Manual Deployment:

If you prefer manual deployment:

```bash
# Build for GitHub Pages
npm run deploy:github

# The output will be in the 'out' directory
# Upload the contents to your GitHub Pages branch
```

### Configuration Details:

- **Base Path**: Automatically configured for GitHub Pages subdirectory
- **Asset Prefix**: Set to match your repository name
- **Static Export**: Enabled for GitHub Pages compatibility
- **Jekyll**: Disabled with `.nojekyll` file

## Vercel Deployment

### Automatic Deployment (Recommended)

1. **Connect Repository**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project" and import your repository

2. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm ci`

3. **Deploy**:
   - Click "Deploy"
   - Your site will be available at a Vercel URL
   - Custom domains can be configured in project settings

#### Manual Deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Configuration Details:

- **Static Export**: Configured in `next.config.ts`
- **Security Headers**: Added via `vercel.json`
- **Trailing Slashes**: Enabled for consistency
- **Clean URLs**: Disabled for static export compatibility

## Environment Variables

### GitHub Pages:
- `GITHUB_PAGES=true` - Automatically set during GitHub Actions deployment
- Enables proper base path and asset prefix configuration

### Vercel:
- No special environment variables required
- Vercel automatically detects Next.js configuration

## Build Commands Reference

```bash
# Development server
npm run dev

# Production build (general)
npm run build

# GitHub Pages build
npm run deploy:github

# Vercel build
npm run deploy:vercel

# Lint code
npm run lint
```

## Troubleshooting

### GitHub Pages Issues:

1. **404 Errors**:
   - Ensure `.nojekyll` file exists in output
   - Check that `basePath` is correctly configured
   - Verify repository name matches configuration

2. **CSS/JS Not Loading**:
   - Check `assetPrefix` configuration
   - Ensure `GITHUB_PAGES` environment variable is set during build

3. **Build Failures**:
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed
   - Check GitHub Actions logs for specific errors

### Vercel Issues:

1. **Build Failures**:
   - Ensure `vercel.json` is properly configured
   - Check build logs in Vercel dashboard
   - Verify Node.js version compatibility

2. **Routing Issues**:
   - Check `rewrites` configuration in `vercel.json`
   - Ensure trailing slashes are handled correctly

## Performance Optimization

Both platforms benefit from the following optimizations already implemented:

- **Static Site Generation**: Pre-rendered HTML for fast loading
- **Image Optimization**: Disabled for static export compatibility
- **Code Splitting**: Automatic with Next.js
- **Compression**: Handled by hosting platforms
- **CDN**: Both platforms provide global CDN

## Custom Domains

### GitHub Pages:
1. Add `CNAME` file to repository root with your domain
2. Configure DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

### Vercel:
1. Go to project settings in Vercel dashboard
2. Add custom domain
3. Configure DNS as instructed
4. SSL certificates are automatically provisioned

## Monitoring and Analytics

Consider adding:
- Google Analytics
- Vercel Analytics (for Vercel deployments)
- GitHub repository insights
- Core Web Vitals monitoring

## Security Considerations

Both deployments include:
- Security headers via configuration
- HTTPS enforcement
- Content Security Policy headers
- XSS protection headers

## Backup and Recovery

- **Source Code**: Stored in Git repository
- **Content**: Markdown files in `posts/` directory
- **Configuration**: All settings in version control
- **Deployment**: Can be re-deployed from any commit

For questions or issues, refer to the platform-specific documentation:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vercel Documentation](https://vercel.com/docs)
