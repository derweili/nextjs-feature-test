import { mockApiGet } from '@/lib/mock-api-client';

interface TimeResponse {
  time: string;
  timestamp: number;
}

async function getCachedData(): Promise<TimeResponse> {
  // This will be cached by default in Next.js
  return mockApiGet<TimeResponse>('/api/time', {
    cache: 'force-cache'
  });
}

async function getNonCachedData(): Promise<TimeResponse> {
  // This will not be cached
  return mockApiGet<TimeResponse>('/api/time', {
    cache: 'no-store'
  });
}

async function getRevalidatedData(): Promise<TimeResponse> {
  // This will be revalidated every 10 seconds
  return mockApiGet<TimeResponse>('/api/time', {
    next: { revalidate: 10 }
  });
}

export default async function FetchCachingPage() {
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
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Current Time</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400">{cachedData.time}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Timestamp: {cachedData.timestamp}</p>
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
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Current Time</h3>
                <p className="text-lg text-red-600 dark:text-red-400">{nonCachedData.time}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Timestamp: {nonCachedData.timestamp}</p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                Time based revalidated Fetch (revalidate: 10s)
              </h2>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                This data is cached but revalidated every 10 seconds.
              </p>
              <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Current Time</h3>
                <p className="text-lg text-yellow-600 dark:text-yellow-400">{revalidatedData.time}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Timestamp: {revalidatedData.timestamp}</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Request Information
              </h2>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Rendered at:</span> {new Date(timestamp).toISOString()}</p>
                <p><span className="font-medium">Timestamp:</span> {timestamp}</p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Test Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-purple-800 dark:text-purple-200">
                <li>Reload this page multiple times to see the differences</li>
                <li>The cached data should remain the same across reloads (same timestamp)</li>
                <li>The non-cached data will change on every request (new timestamp each time)</li>
                <li>The revalidated data will change every 10 seconds (timestamp updates after revalidation period)</li>
                <li>Check the timestamp to see when the page was rendered</li>
                <li>Compare the timestamps to see which data is cached vs fresh</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 