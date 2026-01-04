import { mockApiGet } from '@/lib/mock-api-client';
import { RefreshButton } from '@/components/refresh-button';
import { OnDemandRevalidateClient } from './client';

interface TimeResponse {
  time: string;
  timestamp: number;
}

// This page uses on-demand revalidation (no time-based revalidation)
// The page will be statically generated but can be revalidated via tag or path

async function getTimeData(): Promise<TimeResponse> {
  return mockApiGet<TimeResponse>('/api/time', {
    next: { tags: ['time-data'] }
  });
}

export default async function OnDemandRevalidatePage() {
  const timestamp = Date.now();
  const timeData = await getTimeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Static Page Caching with On-Demand Revalidation
            </h1>
            <RefreshButton />
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Time from API
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                This page is statically generated and can be revalidated on-demand using tags or paths.
                The data below shows the time fetched from the mock API with the tag &apos;time-data&apos;.
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
                  <span className="font-medium">Revalidation type:</span> On-demand (tag or path)
                </p>
              </div>
            </div>

            <OnDemandRevalidateClient />

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                How It Works
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li>
                  This page uses on-demand revalidation instead of time-based revalidation
                </li>
                <li>
                  The page is statically generated at build time and served from cache
                </li>
                <li>
                  Use the buttons above to trigger revalidation via tag or path
                </li>
                <li>
                  When revalidated by tag, all cached data with the &apos;time-data&apos; tag will be invalidated
                </li>
                <li>
                  When revalidated by path, this specific page path will be invalidated
                </li>
                <li>
                  After revalidation, reload the page to see the updated data
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                Test Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>Reload this page multiple times - the time should remain the same (static generation)</li>
                <li>Click &quot;Revalidate by Tag&quot; button to invalidate the &apos;time-data&apos; tag</li>
                <li>Click &quot;Revalidate by Path&quot; button to invalidate this specific path</li>
                <li>After successful revalidation, use the reload button to see updated data</li>
                <li>Compare the API timestamp with the page render timestamp to see when data was fetched</li>
                <li>Check the Network tab to verify cache behavior</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

