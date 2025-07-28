import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  author?: string;
  contentHtml: string;
}

export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  author?: string;
}

// Ensure posts directory exists
export function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Get all post IDs
export function getAllPostIds() {
  ensurePostsDirectory();
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

// Get sorted posts data for listing
export function getSortedPostsData(): PostMetadata[] {
  ensurePostsDirectory();
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || new Date().toISOString(),
        excerpt: matterResult.data.excerpt || '',
        tags: matterResult.data.tags || [],
        author: matterResult.data.author || 'Anonymous',
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Cache for processed markdown
const markdownCache = new Map<string, { content: string; mtime: number }>();

// Get post data by ID with caching
export async function getPostData(id: string): Promise<PostData> {
  ensurePostsDirectory();
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post with id "${id}" not found`);
  }

  // Check cache first
  const stats = fs.statSync(fullPath);
  const cacheKey = `${id}-${stats.mtime.getTime()}`;
  const cached = markdownCache.get(cacheKey);

  let contentHtml: string;

  if (cached) {
    contentHtml = cached.content;
  } else {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    contentHtml = processedContent.toString();

    // Cache the result
    markdownCache.set(cacheKey, { content: contentHtml, mtime: stats.mtime.getTime() });

    // Clean old cache entries (keep only last 10)
    if (markdownCache.size > 10) {
      const oldestKey = markdownCache.keys().next().value;
      if (oldestKey) {
        markdownCache.delete(oldestKey);
      }
    }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    contentHtml,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || new Date().toISOString(),
    excerpt: matterResult.data.excerpt || '',
    tags: matterResult.data.tags || [],
    author: matterResult.data.author || 'Anonymous',
  };
}

// Create a new post
export function createPost(id: string, frontMatter: PostData, content: string) {
  ensurePostsDirectory();
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = matter.stringify(content, frontMatter);
  fs.writeFileSync(fullPath, fileContent);
}
