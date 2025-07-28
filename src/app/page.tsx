import { getSortedPostsData } from '@/lib/markdown';
import BackgroundImage from '@/components/BackgroundImage';
import HeroSection from '@/components/HeroSection';
import { HomeLayout } from '@/components/MainLayout';
import Sidebar from '@/components/Sidebar';
import ArticleList from '@/components/ArticleList';

export default function Home() {
  const allPostsData = getSortedPostsData();
  const recentPosts = allPostsData.slice(0, 6); // 显示最新6篇文章

  return (
    <>
      {/* Poetize风格背景 */}
      <BackgroundImage />

      {/* 首页大标题区域 */}
      <HeroSection
        title="MarkChin 的个人博客"
        subtitle="探索世界的无限风景"
        typewriterTexts={[
          "探索技术的无限可能",
          "分享编程的点点滴滴",
          "记录成长的每一步",
          "创造属于自己的世界"
        ]}
      />

      {/* 主内容区域 */}
      <HomeLayout
        sidebar={<Sidebar posts={allPostsData} />}
      >
        {/* 文章列表 */}
        {recentPosts.length > 0 ? (
          <ArticleList posts={recentPosts} />
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
      </HomeLayout>
    </>
  );
}
