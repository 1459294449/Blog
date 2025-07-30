// 个人信息配置
export const profileConfig = {
  // 基本信息
  name: 'MarkChin',
  title: '211本科人工智能',
  bio: '欢迎来到我的个人博客！211人工智能本科，科技、小说、动漫爱好者。希望您可以喜欢我的博客。',
  
  // 头像设置
  avatar: {
    // 头像文件名（放在 public/images/ 目录下）
    filename: 'avatar.jpg',
    // 备用字母（当头像加载失败时显示）
    fallbackLetter: 'M',
  },
  
  // 联系方式
  contact: {
    email: '1459294449@qq.com',
    github: 'https://github.com/1459294449',
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
