import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SakuraEffect from "@/components/SakuraEffect";

export const metadata: Metadata = {
  title: "MarkChin Space - 探索世界的无限风景",
  description: "MarkChin Space - 211人工智能本科的个人空间，分享科技、编程、小说、动漫的思考与心得。",
  keywords: ["MarkChin Space", "人工智能", "web development", "技术博客", "科技", "小说", "动漫", "个人博客"],
  authors: [{ name: "MarkChin" }],
  openGraph: {
    title: "MarkChin Space - 探索世界的无限风景",
    description: "211人工智能本科的个人空间，科技、小说、动漫爱好者的思考记录。",
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
