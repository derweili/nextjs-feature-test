import { mockApiGet } from '@/lib/mock-api-client';
import { RefreshButton } from '@/components/refresh-button';

interface TimeResponse {
  time: string;
  timestamp: number;
}

// This sets the page to be statically generated with time-based revalidation
// The page will be revalidated every 10 seconds
export const revalidate = 10;

async function getTimeData(): Promise<TimeResponse> {
  return mockApiGet<TimeResponse>('/api/time');
}

export default async function StaticRevalidatePage() {
  const timestamp = Date.now();
  const timeData = await getTimeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Static Page Caching with Time-Based Revalidation
            </h1>
            <RefreshButton />
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Time from API
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                This page is statically generated and revalidated every 10 seconds.
                The data below shows the time fetched from the mock API.
              </p>
              <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Current Time</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400">{timeData.time}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  API Timestamp: {timeData.timestamp}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  API Time (ISO): {new Date(timeData.timestamp).toISOString()}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Page Information
              </h2>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Page rendered at:</span>{' '}
                  {new Date(timestamp).toISOString()}
                </p>
                <p>
                  <span className="font-medium">Render timestamp:</span> {timestamp}
                </p>
                <p>
                  <span className="font-medium">Revalidation period:</span> 10 seconds
                </p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                How It Works
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li>
                  This page uses <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">export const revalidate = 10</code> to enable time-based revalidation
                </li>
                <li>
                  The page is statically generated at build time and served from cache
                </li>
                <li>
                  After 10 seconds, the next request will trigger a background revalidation
                </li>
                <li>
                  The cached page is served immediately while revalidation happens in the background
                </li>
                <li>
                  Once revalidation completes, the new page is cached and served to subsequent requests
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                Test Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>Reload this page multiple times within 10 seconds - the time should remain the same</li>
                <li>Wait more than 10 seconds and reload - the time should update</li>
                <li>Use the refresh button to manually trigger a revalidation</li>
                <li>Compare the API timestamp with the page render timestamp to see when data was fetched</li>
                <li>Check the Network tab to see when background revalidation occurs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

