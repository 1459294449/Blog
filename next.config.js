/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// 动态获取仓库名称
const getRepoName = () => {
  if (process.env.GITHUB_REPOSITORY) {
    return '/' + process.env.GITHUB_REPOSITORY.split('/')[1];
  }
  // 本地开发时的默认值
  return '/MarkchinSpace';
};

const repoName = getRepoName();

console.log('=== Next.js Config Debug ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('GITHUB_PAGES:', process.env.GITHUB_PAGES);
console.log('GITHUB_REPOSITORY:', process.env.GITHUB_REPOSITORY);
console.log('isProd:', isProd);
console.log('isGitHubPages:', isGitHubPages);
console.log('Repo name:', repoName);
console.log('Will use basePath:', isProd && isGitHubPages ? repoName : '');
console.log('============================');

const nextConfig = {
  // 强制静态导出 - 这是关键配置
  output: 'export',

  // 基本配置
  trailingSlash: true,

  // 图片配置 - 静态导出必需
  images: {
    unoptimized: true
  },

  // GitHub Pages 配置
  basePath: isProd && isGitHubPages ? repoName : '',
  assetPrefix: isProd && isGitHubPages ? repoName : '',

  // 禁用服务器端功能
  generateEtags: false,
  poweredByHeader: false,

  // 构建配置
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

console.log('=== Final Next.js Config ===');
console.log('output:', nextConfig.output);
console.log('basePath:', nextConfig.basePath);
console.log('assetPrefix:', nextConfig.assetPrefix);
console.log('images.unoptimized:', nextConfig.images?.unoptimized);
console.log('============================');

module.exports = nextConfig;
