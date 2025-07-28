# 版本控制指南

## 当前版本: v1.0.0

### 版本历史

#### v1.0.0 (2025-07-25)
- 🎉 初始化中文技术博客
- ✨ 完整的中文化界面和内容
- 🚀 支持 GitHub Pages 自动部署
- 📝 包含4篇技术文章

## 版本管理策略

### 1. 语义化版本控制

```
主版本.次版本.修订版本 (例如: 1.2.3)
```

- **主版本 (1.x.x)**: 重大架构变更、技术栈升级、不兼容更新
- **次版本 (x.1.x)**: 新功能、新文章、界面改进、新组件
- **修订版本 (x.x.1)**: Bug 修复、内容更新、样式调整

### 2. 分支管理

```
master (主分支)     - 稳定的生产版本，自动部署到 GitHub Pages
├── develop         - 开发分支，集成新功能
├── feature/新文章   - 新文章开发分支
├── feature/新功能   - 新功能开发分支
└── hotfix/修复     - 紧急修复分支
```

### 3. 提交信息规范

#### 格式模板:
```
类型(范围): 简短描述

详细说明:
- 具体修改点1
- 具体修改点2
- 具体修改点3

文件变更:
- 新增: 文件路径
- 修改: 文件路径 (修改内容)
- 删除: 文件路径

影响范围: [前端/内容/配置/文档]
版本: v1.2.3
测试状态: [已测试/需测试]
```

#### 提交类型:

| 类型 | 图标 | 说明 | 版本影响 |
|------|------|------|----------|
| `feat` | ✨ | 新功能、新文章 | 次版本 +1 |
| `fix` | 🐛 | Bug修复 | 修订版本 +1 |
| `docs` | 📝 | 文档更新 | 修订版本 +1 |
| `style` | 💄 | 样式调整、UI改进 | 修订版本 +1 |
| `refactor` | ♻️ | 代码重构 | 次版本 +1 |
| `perf` | ⚡ | 性能优化 | 修订版本 +1 |
| `build` | 👷 | 构建系统、依赖更新 | 修订版本 +1 |
| `ci` | 💚 | CI/CD 配置 | 修订版本 +1 |
| `breaking` | 💥 | 破坏性变更 | 主版本 +1 |

## 工作流程

### 新文章发布流程

1. **创建分支**:
   ```bash
   git checkout -b feature/新文章标题
   ```

2. **编写文章**:
   - 在 `posts/` 目录创建 Markdown 文件
   - 添加正确的 frontmatter
   - 本地测试: `npm run dev`

3. **提交变更**:
   ```bash
   git add posts/新文章.md
   git commit -m "feat(content): 添加新文章《文章标题》

   详细说明:
   - 新增技术文章: 《文章标题》
   - 涵盖主题: [具体技术点]
   - 字数: 约 X 字
   - 包含代码示例和实践指导

   文件变更:
   - 新增: posts/新文章.md

   影响范围: 内容
   版本: v1.1.0
   测试状态: 已测试"
   ```

4. **合并到主分支**:
   ```bash
   git checkout master
   git merge feature/新文章标题
   git tag v1.1.0
   git push origin master --tags
   ```

### 界面优化流程

1. **创建分支**:
   ```bash
   git checkout -b feature/界面优化
   ```

2. **修改组件**:
   ```bash
   git commit -m "style(ui): 优化博客界面设计

   详细说明:
   - 改进首页布局和视觉层次
   - 优化文章卡片设计
   - 增强响应式体验
   - 调整颜色搭配和字体大小

   文件变更:
   - 修改: src/components/Header.tsx (导航栏样式)
   - 修改: src/components/PostCard.tsx (卡片布局)
   - 修改: src/app/globals.css (全局样式)

   影响范围: 前端
   版本: v1.0.1
   测试状态: 已测试"
   ```

### Bug 修复流程

```bash
git commit -m "fix(style): 修复移动端导航菜单显示问题

详细说明:
- 修复移动端导航菜单无法正常显示的问题
- 调整响应式断点设置
- 优化触摸交互体验

文件变更:
- 修改: src/components/Header.tsx (移动端菜单逻辑)
- 修改: src/app/globals.css (响应式样式)

影响范围: 前端
版本: v1.0.2
测试状态: 已测试
修复问题: #001"
```

## 发布检查清单

### 发布前检查:
- [ ] 本地构建成功: `npm run build`
- [ ] 本地预览正常: `npm run start`
- [ ] 所有链接可访问
- [ ] 移动端显示正常
- [ ] SEO 信息完整
- [ ] 图片资源优化

### 发布后验证:
- [ ] GitHub Pages 部署成功
- [ ] 网站可正常访问
- [ ] 新内容显示正确
- [ ] 性能指标正常

## 版本发布命令

```bash
# 1. 更新版本号
npm version patch  # 修订版本 +1
npm version minor  # 次版本 +1  
npm version major  # 主版本 +1

# 2. 推送到 GitHub
git push origin master --tags

# 3. 创建 GitHub Release
# 在 GitHub 网页端创建 Release，包含更新日志
```

## 回滚策略

如果发现问题需要回滚:

```bash
# 1. 回滚到上一个版本
git revert HEAD

# 2. 或回滚到指定版本
git reset --hard v1.0.0

# 3. 强制推送 (谨慎使用)
git push --force-with-lease origin master
```

## 协作规范

### 代码审查:
- 所有功能分支合并前需要自我审查
- 重要更新建议创建 Pull Request
- 确保提交信息清晰详细

### 文档维护:
- 每次发布更新 CHANGELOG.md
- 重要功能更新 README.md
- API 变更更新相关文档

---

**记住**: 良好的版本控制不仅是技术实践，更是对未来自己和协作者的负责！
