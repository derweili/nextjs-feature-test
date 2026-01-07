import { Suspense } from 'react';
import { unstable_cache } from 'next/cache';
import { mockApiGet } from '@/lib/mock-api-client';

interface TimeResponse {
  time: string;
  timestamp: number;
}

// Fetch time from mock API (non-cached)
async function getTimeData(): Promise<TimeResponse> {
  return mockApiGet<TimeResponse>('/api/time', {
    cache: 'no-store'
  });
}

// Cached version with time-based revalidation
const getCachedTimeWithRevalidate = unstable_cache(
  async () => {
    return getTimeData();
  },
  ['time-revalidate'], // cache key
  {
    tags: ['time-revalidate'],
    revalidate: 10, // revalidate every 10 seconds
  }
);

// Cached version without revalidation
const getCachedTimeNoRevalidate = unstable_cache(
  async () => {
    return getTimeData();
  },
  ['time-no-revalidate'], // cache key
  {
    tags: ['time-no-revalidate'],
    revalidate: false, // no automatic revalidation
  }
);

async function CacheDataContent() {
  // Get time data to demonstrate caching (access data first for Cache Components)
  const [timeDynamic, timeCachedWithRevalidate, timeCachedNoRevalidate] = await Promise.all([
    getTimeData(), // Non-cached (dynamic)
    getCachedTimeWithRevalidate(), // Cached with time-based revalidation
    getCachedTimeNoRevalidate(), // Cached without revalidation
  ]);
  
  // Get timestamp after accessing data (required for Cache Components)
  const timestamp = Date.now();

  return (
    <>
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Cached Time (no revalidation)
        </h2>
        <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
          This is cached using unstable_cache without automatic revalidation. Can only be revalidated manually using revalidateTag(&apos;time-no-revalidate&apos;).
        </p>
        <div className="bg-white dark:bg-gray-700 p-4 rounded border">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Cached Time</h3>
          <p className="text-lg text-blue-600 dark:text-blue-400">{timeCachedNoRevalidate.time}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Timestamp: {timeCachedNoRevalidate.timestamp}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ISO: {new Date(timeCachedNoRevalidate.timestamp).toISOString()}
          </p>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
          Dynamic Time (No Caching)
        </h2>
        <p className="text-sm text-red-700 dark:text-red-300 mb-2">
          This is fetched fresh on every request (no caching).
        </p>
        <div className="bg-white dark:bg-gray-700 p-4 rounded border">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Current Time</h3>
          <p className="text-lg text-red-600 dark:text-red-400">{timeDynamic.time}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Timestamp: {timeDynamic.timestamp}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            ISO: {new Date(timeDynamic.timestamp).toISOString()}
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          Cached Time (with time-based revalidation: 10s)
        </h2>
        <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
          This is cached using unstable_cache with automatic revalidation every 10 seconds. Can also be manually revalidated using revalidateTag(&apos;time-revalidate&apos;).
        </p>
        <div className="bg-white dark:bg-gray-700 p-4 rounded border">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Cached Time</h3>
          <p className="text-lg text-yellow-600 dark:text-yellow-400">{timeCachedWithRevalidate.time}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Timestamp: {timeCachedWithRevalidate.timestamp}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            ISO: {new Date(timeCachedWithRevalidate.timestamp).toISOString()}
          </p>
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
    </>
  );
}

export default function UnstableCachePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Unstable Cache Test
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Tests the <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">unstable_cache</code> function for programmatic caching of data fetching functions. The timestamps shown are fetched from an external mock API, not generated by Next.js itself. Compares cached data with time-based revalidation, cached data without revalidation, and dynamic (non-cached) data.
          </p>
          
          <div className="space-y-6">
            <Suspense fallback={
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">Loading cache data...</p>
              </div>
            }>
              <CacheDataContent />
            </Suspense>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Test Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-purple-800 dark:text-purple-200">
                <li>Reload this page multiple times to see caching behavior</li>
                <li>Dynamic time will always be fresh (different on each request)</li>
                <li>Cached time with revalidation automatically revalidates every 10 seconds</li>
                <li>Cached time without revalidation never revalidates automatically - only manually via revalidateTag</li>
                <li>Compare timestamps to see when data was fetched vs when the page was rendered</li>
                <li>Notice how cached time values remain the same across reloads until revalidation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
