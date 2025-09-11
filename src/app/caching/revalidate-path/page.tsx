import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Simulate some data that could be revalidated
async function getPageData() {
  const timestamp = Date.now();
  const randomValue = Math.floor(Math.random() * 1000);
  
  return {
    timestamp,
    randomValue,
    renderedAt: new Date().toISOString(),
    message: 'This data will be revalidated when the path is invalidated'
  };
}

export default async function RevalidatePathPage() {
  const headersList = await headers();
  const data = await getPageData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Revalidate Path Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Current Page Data
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                This data will be cached until the path is revalidated.
              </p>
              <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Timestamp</h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-mono">{data.timestamp}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Random Value</h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-mono">{data.randomValue}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Rendered At</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-mono">{data.renderedAt}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Message</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{data.message}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
                Revalidation Actions
              </h2>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                Use these buttons to test revalidatePath functionality.
              </p>
              <div className="space-y-4">
                <form action={async () => {
                  'use server';
                  revalidatePath('/caching/revalidate-path');
                }}>
                  <button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Revalidate This Path
                  </button>
                </form>
                
                <form action={async () => {
                  'use server';
                  revalidatePath('/caching');
                }}>
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Revalidate Parent Path (/caching)
                  </button>
                </form>
                
                <form action={async () => {
                  'use server';
                  revalidatePath('/');
                }}>
                  <button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Revalidate Root Path (/)
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Request Information
              </h2>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Rendered at:</span> {data.renderedAt}</p>
                <p><span className="font-medium">Timestamp:</span> {data.timestamp}</p>
                <p><span className="font-medium">User Agent:</span> {headersList.get('user-agent')?.substring(0, 50)}...</p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                Test Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>Reload this page multiple times to see the cached data</li>
                <li>Click &quot;Revalidate This Path&quot; to invalidate the cache for this page</li>
                <li>Click &quot;Revalidate Parent Path&quot; to invalidate cache for the /caching directory</li>
                <li>Click &quot;Revalidate Root Path&quot; to invalidate cache for the entire site</li>
                <li>After revalidation, reload the page to see fresh data</li>
                <li>Check the timestamp and random value to confirm the data changed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 