// 个人信息配置
export const profileConfig = {
  // 基本信息
  name: 'MarkChin',
  title: 'Full Stack Developer',
  bio: '欢迎来到我的个人博客！我是一名热爱技术的开发者，专注于现代 Web 开发技术。',
  
  // 头像设置
  avatar: {
    // 头像文件名（放在 public/images/ 目录下）
    filename: 'avatar.jpg',
    // 备用字母（当头像加载失败时显示）
    fallbackLetter: 'M',
  },
  
  // 联系方式
  contact: {
    email: 'your-email@example.com',
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
  
  // 技能标签
  skills: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'Docker',
  ],
  
  // 社交媒体
  social: {
    github: 'yourusername',
    twitter: 'yourusername',
    linkedin: 'yourusername',
  }
};

// 获取头像路径的辅助函数
export const getAvatarPath = () => `/images/${profileConfig.avatar.filename}`;

// 获取备用字母的辅助函数
export const getFallbackLetter = () => profileConfig.avatar.fallbackLetter;
