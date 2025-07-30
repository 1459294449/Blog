# 头像和个人信息替换指南

## 📸 如何替换头像

### 方法一：替换头像文件（推荐）
1. 准备您的头像图片，建议尺寸为 **512x512** 像素或更大的正方形图片
2. 将图片重命名为 `avatar.jpg`
3. 将新的 `avatar.jpg` 文件放入 `blog/public/images/` 目录，替换原有文件
4. 刷新网页即可看到新头像

### 方法二：使用不同的文件名
1. 将您的头像图片放入 `blog/public/images/` 目录
2. 编辑 `blog/src/config/profile.ts` 文件
3. 修改 `avatar.filename` 字段为您的图片文件名

```typescript
avatar: {
  filename: 'your-avatar.jpg', // 改为您的文件名
  fallbackLetter: 'M',
}
```

## 👤 如何修改个人信息

编辑 `blog/src/config/profile.ts` 文件中的配置：

```typescript
export const profileConfig = {
  // 基本信息
  name: 'Your Name',           // 修改姓名
  title: 'Your Title',         // 修改职位/标题
  bio: 'Your bio here...',     // 修改个人简介
  
  // 头像设置
  avatar: {
    filename: 'avatar.jpg',    // 头像文件名
    fallbackLetter: 'Y',       // 备用字母（头像加载失败时显示）
  },
  
  // 联系方式
  contact: {
    email: 'your-email@example.com',
    github: 'https://github.com/yourusername',
    // ... 其他联系方式
  },
  
  // 技能标签
  skills: [
    'React',
    'Vue.js',
    // ... 添加您的技能
  ],
}
```

## 🎨 头像显示位置

修改配置后，头像会在以下位置自动更新：
- 🏠 **首页侧边栏** - 个人信息卡片
- 🧭 **导航栏** - 左上角 Logo
- 📄 **关于页面** - 个人头像展示

## 💡 注意事项

1. **图片格式**：支持 `.jpg`、`.png`、`.webp` 等常见格式
2. **图片大小**：建议不超过 2MB，以确保加载速度
3. **图片比例**：建议使用正方形图片，避免变形
4. **备用显示**：如果头像加载失败，会显示配置的字母作为备用

## 🔄 如何生效

修改配置文件后：
1. 保存文件
2. 如果开发服务器正在运行，会自动热重载
3. 如果没有运行，重新启动开发服务器：`npm run dev`

## 🎯 快速替换示例

假设您想将头像改为 `my-photo.png`：

1. 将 `my-photo.png` 放入 `blog/public/images/` 目录
2. 编辑 `blog/src/config/profile.ts`：
   ```typescript
   avatar: {
     filename: 'my-photo.png',
     fallbackLetter: 'M', // 或改为您姓名的首字母
   }
   ```
3. 保存文件，刷新页面即可看到效果

就是这么简单！🎉
