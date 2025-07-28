import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SakuraEffect from "@/components/SakuraEffect";

export const metadata: Metadata = {
  title: "MarkChin 的个人博客 - 探索世界的无限风景",
  description: "MarkChin 的个人技术博客，分享 Web 开发、软件工程和编程实践经验。使用 Next.js 构建，专注于现代前端技术。",
  keywords: ["web development", "software engineering", "nextjs", "typescript", "technical blog", "MarkChin", "个人博客"],
  authors: [{ name: "MarkChin" }],
  openGraph: {
    title: "MarkChin 的个人博客 - 探索世界的无限风景",
    description: "分享技术心得，记录编程之路，探索代码世界的无限可能。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen font-sans">
        <SakuraEffect />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
