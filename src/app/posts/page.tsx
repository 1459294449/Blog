import { getSortedPostsData } from '@/lib/markdown';
import BackgroundImage from '@/components/BackgroundImage';
import MainLayout from '@/components/MainLayout';
import Sidebar from '@/components/Sidebar';
import ArticleList from '@/components/ArticleList';

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      {/* Poetize风格背景 */}
      <BackgroundImage />


      {/* 主内容区域 */}
      <MainLayout
        sidebar={<Sidebar posts={allPostsData} />}
        className="pt-24" // 为固定Header留出空间
      >
        {/* 页面标题 */}
        <div className="mb-12 animate-fade-in">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              文章列表
            </h1>
            <p className="text-xl text-white/70 mb-6">
              探索技术世界，分享编程心得，记录学习之路
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* 文章列表 */}
        {allPostsData.length > 0 ? (
          <ArticleList posts={allPostsData} />
        ) : (
          <div className="glass-card-elegant p-12 text-center animate-fade-in">
            <div className="text-white/40 mb-6">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4">
              暂无文章
            </h3>
            <p className="text-white/60 text-lg">
              敬请期待精彩内容！
            </p>
          </div>
        )}
      </MainLayout>
    </>
  );
}
