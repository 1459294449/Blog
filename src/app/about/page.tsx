import { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { getImagePath } from '@/utils/paths';
import { profileConfig, getAvatarPath, getFallbackLetter } from '@/config/profile';

export const metadata: Metadata = {
  title: 'About | MarkChin 的个人博客',
  description: 'Learn more about MarkChin and his personal blog.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-orange-500 transition-colors">
              MarkChin
            </Link>

            {/* Navigation Links */}
            <nav className="flex space-x-6">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                首页
              </Link>
              <Link
                href="/posts"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                分类
              </Link>
              <Link
                href="/about"
                className="text-orange-500 font-medium px-4 py-2 rounded-lg bg-orange-50 dark:bg-orange-900/20"
              >
                关于
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          {/* 个人头像 */}
          <div className="mb-8">
            <img
              src={getAvatarPath()}
              alt={`${profileConfig.name} Avatar`}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-200 dark:border-orange-800 shadow-lg"
              onError={(e) => {
                // 如果头像加载失败，显示默认样式
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-32 h-32 rounded-full mx-auto bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center border-4 border-orange-200 dark:border-orange-800 shadow-lg"><span class="text-white text-4xl font-bold">${getFallbackLetter()}</span></div>`;
                }
              }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            关于我
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hello, I&apos;m {profileConfig.name}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="poetize-card rounded-xl p-8 mb-8 animate-scale-in">
            <h2 className="text-2xl font-bold gradient-text-orange mb-4 animate-text-shimmer">
              👋 你好，我是 {profileConfig.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 animate-fade-in-delay">
              {profileConfig.bio}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              🚀 技术栈
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS'].map((tech, index) => (
                <div
                  key={tech}
                  className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg text-center card-hover-effect border border-orange-200/50 dark:border-orange-800/50 stagger-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-sm font-medium gradient-text-orange">{tech}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              💡 博客理念
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              &ldquo;探索世界的无限风景&rdquo; - 这不仅是我博客的副标题，更是我对技术学习的态度。
              我相信每一行代码都是通往新世界的桥梁，每一个项目都是探索未知的旅程。
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              📫 联系方式
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:your-email@example.com"
                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                📧 邮箱联系
              </a>
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
              >
                🐙 GitHub
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
