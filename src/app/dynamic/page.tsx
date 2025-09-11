import { headers } from 'next/headers';

export default async function DynamicPage() {
  // Generate different content on every render
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000);
  const randomString = Math.random().toString(36).substring(2, 15);
  
  // Get request headers to add more variability
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'unknown';
  const acceptLanguage = headersList.get('accept-language') || 'en';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Dynamic Rendering Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Dynamic Content (Changes on every reload)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Timestamp</h3>
                  <p className="text-2xl font-mono text-blue-600 dark:text-blue-400">{timestamp}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Random Number</h3>
                  <p className="text-2xl font-mono text-green-600 dark:text-green-400">{randomNumber}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Random String</h3>
                  <p className="text-lg font-mono text-purple-600 dark:text-purple-400 break-all">{randomString}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">User Agent Hash</h3>
                  <p className="text-sm font-mono text-orange-600 dark:text-orange-400 break-all">
                    {Buffer.from(userAgent).toString('base64').substring(0, 20)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
                Request Information
              </h2>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Accept Language:</span> {acceptLanguage}</p>
                <p><span className="font-medium">User Agent:</span> {userAgent.substring(0, 100)}...</p>
                <p><span className="font-medium">Rendered at:</span> {new Date().toISOString()}</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                Test Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>Reload this page multiple times to see different content</li>
                <li>The timestamp, random number, and random string should change on each reload</li>
                <li>This demonstrates server-side dynamic rendering in Next.js</li>
                <li>Use the E2E test to verify this behavior automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 