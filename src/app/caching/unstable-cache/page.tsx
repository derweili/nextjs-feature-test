import { unstable_cache } from 'next/cache';
import { headers } from 'next/headers';

// Simulate a database query function
async function getUserById(id: string) {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Simulate different user data based on ID
  const users = {
    '1': { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
    '2': { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
    '3': { id: '3', name: 'Carol Davis', email: 'carol@example.com', role: 'moderator' }
  };
  
  return users[id as keyof typeof users] || { id, name: 'Unknown User', email: 'unknown@example.com', role: 'guest' };
}

// Cached version with tags
const getCachedUser = unstable_cache(
  async (id: string) => {
    return getUserById(id);
  },
  ['user'], // cache key
  {
    tags: ['user'],
    revalidate: 30, // revalidate every 30 seconds
  }
);

// Cached version without tags
const getCachedUserNoTags = unstable_cache(
  async (id: string) => {
    return getUserById(id);
  },
  ['user-no-tags'], // cache key
  {
    revalidate: 60, // revalidate every 60 seconds
  }
);

export default async function UnstableCachePage() {
  const headersList = await headers();
  const timestamp = Date.now();
  
  // Get different users to demonstrate caching
  const [user1, user2, user3, user1Cached, user2Cached] = await Promise.all([
    getUserById('1'), // Non-cached
    getUserById('2'), // Non-cached
    getUserById('3'), // Non-cached
    getCachedUser('1'), // Cached with tags
    getCachedUser('2'), // Cached with tags
  ]);

  const user3Cached = await getCachedUserNoTags('3'); // Cached without tags

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Unstable Cache Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
                Non-Cached Users (Fresh Data)
              </h2>
              <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                These are fetched fresh on every request (no caching).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">User 1</h3>
                  <p className="text-lg text-red-600 dark:text-red-400">{user1.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user1.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Role: {user1.role}</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">User 2</h3>
                  <p className="text-lg text-red-600 dark:text-red-400">{user2.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user2.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Role: {user2.role}</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">User 3</h3>
                  <p className="text-lg text-red-600 dark:text-red-400">{user3.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user3.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Role: {user3.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Cached Users (with tags, revalidate: 30s)
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                These are cached and can be revalidated using revalidateTag(&apos;user&apos;).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Cached User 1</h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400">{user1Cached.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user1Cached.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Role: {user1Cached.role}</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Cached User 2</h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400">{user2Cached.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user2Cached.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Role: {user2Cached.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
                Cached User (no tags, revalidate: 60s)
              </h2>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                This is cached without tags and revalidates every 60 seconds.
              </p>
              <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Cached User 3 (No Tags)</h3>
                <p className="text-lg text-green-600 dark:text-green-400">{user3Cached.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user3Cached.email}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Role: {user3Cached.role}</p>
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

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                Test Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>Reload this page multiple times to see caching behavior</li>
                <li>Non-cached users will always be fresh</li>
                <li>Cached users with tags can be revalidated using revalidateTag(&apos;user&apos;)</li>
                <li>Cached users without tags revalidate every 60 seconds</li>
                <li>Check the timestamp to see when the page was rendered</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 