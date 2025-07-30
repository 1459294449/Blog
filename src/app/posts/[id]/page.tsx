import { getAllPostIds, getPostData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BackgroundImage from '@/components/BackgroundImage';
import { ContentCard } from '@/components/GlassCard';
import MarkdownContent from '@/components/MarkdownContent';
import ArticleThemeToggle from '@/components/ArticleThemeToggle';
import TableOfContents from '@/components/TableOfContents';
import { getAssetPath } from '@/utils/paths';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    id: path.params.id,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = await params;
  
  try {
    const postData = await getPostData(id);
    return {
      title: `${postData.title} | Tech Blog`,
      description: postData.excerpt || `Read ${postData.title} on Tech Blog`,
      openGraph: {
        title: postData.title,
        description: postData.excerpt || `Read ${postData.title} on Tech Blog`,
        type: 'article',
        publishedTime: postData.date,
        authors: [postData.author || 'Anonymous'],
        tags: postData.tags,
      },
    };
  } catch {
    return {
      title: 'Post Not Found | Tech Blog',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  
  let postData;
  try {
    postData = await getPostData(id);
  } catch {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Poetize风格背景 */}
      <BackgroundImage />

      {/* 主容器 */}
      <div className="poetize-container">
        {/* 顶部工具栏 */}
        <div className="w-full max-w-6xl mb-6 animate-fade-in">
          <div className="flex items-center justify-between">
            {/* 返回按钮 */}
            <Link
              href="/posts"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors glass-card px-4 py-2"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回文章列表
            </Link>

            {/* 主题切换按钮 */}
            <ArticleThemeToggle />
          </div>
        </div>

        {/* 文章布局容器 */}
        <div className="w-full max-w-8xl flex gap-1 animate-scale-in">
          {/* 左侧目录 */}
          <aside className="hidden lg:block w-70 flex-shrink-0">
            <div className="sticky top-16">
              <TableOfContents
                content={postData.contentHtml}
                className="mb-4"
              />
            </div>
          </aside>

          {/* 主要内容区域 */}
          <main className="flex-1 min-w-0">
            <ContentCard className="w-11/12">
              {/* 文章头部 */}
              <header className="mb-8 pb-6 border-b border-white/20">
                {/* 封面图片 */}
                {postData.cover && (
                  <div className="mb-6 -mx-6 sm:-mx-8 lg:-mx-12">
                    <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-gradient-to-br from-orange-400/20 to-pink-400/20">
                      <img
                        src={getAssetPath(postData.cover)}
                        alt={`${postData.title} 封面`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // 如果图片加载失败，隐藏封面区域
                          const target = e.target as HTMLImageElement;
                          const container = target.closest('.mb-6');
                          if (container) {
                            container.remove();
                          }
                        }}
                      />
                      {/* 渐变遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </div>
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {postData.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center text-white/60">
                    <time dateTime={postData.date} className="text-sm">
                      {formatDate(postData.date)}
                    </time>
                    {postData.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="text-sm">{postData.author}</span>
                      </>
                    )}
                  </div>

                  {postData.tags && postData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {postData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </header>

              {/* 移动端目录 */}
              <div className="lg:hidden mb-6">
                <TableOfContents
                  content={postData.contentHtml}
                  className="mb-4"
                />
              </div>

              {/* 文章内容 */}
              <MarkdownContent
                content={postData.contentHtml}
                className="prose prose-lg max-w-none prose-invert article-content"
              />

              {/* 文章底部 */}
              <footer className="mt-8 pt-6 border-t border-white/20 text-center">
                <Link
                  href="/posts"
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  返回所有文章
                </Link>
              </footer>
            </ContentCard>
          </main>
        </div>
      </div>
    </>
  );
}
