/**
 * 路径工具函数
 * 处理 GitHub Pages 的 basePath 问题
 */

// 获取当前的 basePath
export function getBasePath(): string {
  // 在客户端环境中，可以通过 window.location 判断
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // 检测 GitHub Pages 环境
    if (hostname.includes('github.io')) {
      // 如果是 username.github.io/repo-name 格式
      if (pathname.startsWith('/Blog')) {
        return '/Blog';
      }
      // 如果路径包含仓库名，提取它
      const pathParts = pathname.split('/').filter(Boolean);
      if (pathParts.length > 0 && pathParts[0] !== 'posts' && pathParts[0] !== 'about') {
        return '/' + pathParts[0];
      }
    }
  }

  // 在构建时，通过环境变量判断
  if (process.env.GITHUB_PAGES === 'true' || process.env.NODE_ENV === 'production') {
    // 如果有 GITHUB_REPOSITORY 环境变量，使用它
    if (process.env.GITHUB_REPOSITORY) {
      return '/' + process.env.GITHUB_REPOSITORY.split('/')[1];
    }
    // 默认使用 /Blog
    return '/Blog';
  }

  return '';
}

// 获取完整的资源路径
export function getAssetPath(path: string): string {
  const basePath = getBasePath();
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}

// 获取图片路径
export function getImagePath(imageName: string): string {
  return getAssetPath(`/images/${imageName}`);
}
