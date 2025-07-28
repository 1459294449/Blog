import Link from 'next/link';
import { PostMetadata } from '@/lib/markdown';

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="group glass-card-post p-6 overflow-hidden relative">
      {/* 装饰性渐变边框 */}
      <div className="absolute inset-0 rounded-20 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex flex-col h-full relative z-10">
        <div className="flex-grow">
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-500 cursor-pointer">
              {post.title}
            </h2>
          </Link>

          {post.excerpt && (
            <p className="text-white/70 mb-4 line-clamp-3 group-hover:text-white/85 transition-colors duration-300 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center text-sm text-white/60">
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            {post.author && (
              <>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-white/10 to-white/5 text-white/80 hover:from-white/20 hover:to-white/10 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 animate-scale-in backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-white/50 animate-fade-in">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white px-6 py-3 rounded-full font-medium text-sm transition-all duration-500 backdrop-blur-sm border border-white/20 hover:border-white/30 group-hover:scale-105 hover:shadow-lg hover:shadow-white/10"
          >
            <span className="mr-2">✨</span>
            阅读更多
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
