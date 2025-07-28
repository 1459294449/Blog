#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createNewPost() {
  console.log('📝 创建新博客文章\n');

  const title = await question('文章标题: ');
  const excerpt = await question('文章摘要: ');
  const tags = await question('标签 (用逗号分隔): ');
  const author = await question('作者 (默认: Tech Blogger): ') || 'Tech Blogger';

  // 生成文件名
  const fileName = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const today = new Date().toISOString().split('T')[0];
  const tagsArray = tags.split(',').map(tag => `"${tag.trim()}"`).join(', ');

  const frontMatter = `---
title: "${title}"
date: "${today}"
excerpt: "${excerpt}"
tags: [${tagsArray}]
author: "${author}"
---

# ${title}

在这里开始写你的文章内容...

## 章节标题

文章内容...

## 总结

总结内容...
`;

  const filePath = path.join(__dirname, '..', 'posts', `${fileName}.md`);

  try {
    fs.writeFileSync(filePath, frontMatter);
    console.log(`\n✅ 文章创建成功！`);
    console.log(`📁 文件位置: posts/${fileName}.md`);
    console.log(`🌐 URL: /posts/${fileName}`);
    console.log(`\n💡 提示: 现在可以编辑文件添加内容，然后重启开发服务器查看效果。`);
  } catch (error) {
    console.error('❌ 创建文章失败:', error.message);
  }

  rl.close();
}

createNewPost();
