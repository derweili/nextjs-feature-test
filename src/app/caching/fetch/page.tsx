import { headers } from 'next/headers';

async function getCachedData() {
  // This will be cached by default in Next.js
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'force-cache'
  });
  return response.json();
}

async function getNonCachedData() {
  // This will not be cached
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/2', {
    cache: 'no-store'
  });
  return response.json();
}

async function getRevalidatedData() {
  // This will be revalidated every 10 seconds
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/3', {
    next: { revalidate: 10 }
  });
  return response.json();
}

export default async function FetchCachingPage() {
  const headersList = await headers();
  const timestamp = Date.now();
  
  const [cachedData, nonCachedData, revalidatedData] = await Promise.all([
    getCachedData(),
    getNonCachedData(),
    getRevalidatedData()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Fetch Caching Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Cached Fetch (force-cache)
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                This data is cached and will be the same across requests until the page is rebuilt.
              </p>
              <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Post Title</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400">{cachedData.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{cachedData.body}</p>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
                Non-Cached Fetch (no-store)
              </h2>
              <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                This data is fetched fresh on every request.
              </p>
              <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Post Title</h3>
                <p className="text-lg text-red-600 dark:text-red-400">{nonCachedData.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{nonCachedData.body}</p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                Revalidated Fetch (revalidate: 10s)
              </h2>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                This data is cached but revalidated every 10 seconds.
              </p>
              <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Post Title</h3>
                <p className="text-lg text-yellow-600 dark:text-yellow-400">{revalidatedData.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{revalidatedData.body}</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Request Information
              </h2>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Rendered at:</span> {new Date(timestamp).toISOString()}</p>
                <p><span className="font-medium">Timestamp:</span> {timestamp}</p>
                <p><span className="font-medium">User Agent:</span> {headersList.get('user-agent')?.substring(0, 50)}...</p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Test Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-purple-800 dark:text-purple-200">
                <li>Reload this page multiple times to see the differences</li>
                <li>The cached data should remain the same across reloads</li>
                <li>The non-cached data may change (depending on the API)</li>
                <li>The revalidated data will change every 10 seconds</li>
                <li>Check the timestamp to see when the page was rendered</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 