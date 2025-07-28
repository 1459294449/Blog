// 简单的测试页面，用于验证静态导出
export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">测试页面</h1>
      <p className="text-gray-600">
        这是一个简单的测试页面，用于验证 Next.js 静态导出是否正常工作。
      </p>
      <p className="text-gray-600 mt-4">
        如果你能看到这个页面，说明静态导出功能正常。
      </p>
    </div>
  );
}
