export default function Loading() {
  return (
    <div className="animate-pulse max-w-none">
      {/* Back link skeleton */}
      <div className="mb-8">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>

      {/* Post header skeleton */}
      <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
          
          <div className="flex space-x-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-18"></div>
          </div>
        </div>
      </header>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
        
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded my-6"></div>
        
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded my-6"></div>
        
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      </div>

      {/* Footer skeleton */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
        </div>
      </footer>
    </div>
  );
}
