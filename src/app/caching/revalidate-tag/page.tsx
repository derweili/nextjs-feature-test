import { headers } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { unstable_cache } from 'next/cache';

// Types for API responses
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

type Comment = {
  id: number;
  name: string;
  body: string;
  email: string;
  postId: number;
};

// Simulate data fetching functions with different tags
async function getPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', {
    next: { tags: ['posts'] }
  });
  return response.json();
}

async function getUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3', {
    next: { tags: ['users'] }
  });
  return response.json();
}

async function getComments(): Promise<Comment[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3', {
    next: { tags: ['comments'] }
  });
  return response.json();
}

// Cached function with tags
const getCachedData = unstable_cache(
  async () => {
    const timestamp = Date.now();
    return {
      timestamp,
      message: 'This data is cached with tags and can be revalidated',
      randomValue: Math.floor(Math.random() * 1000)
    };
  },
  ['cached-data'],
  {
    tags: ['cached-data'],
    revalidate: 60
  }
);

export default async function RevalidateTagPage() {
  const headersList = await headers();
  const timestamp = Date.now();
  
  // Fetch data with different tags
  const [posts, users, comments, cachedData] = await Promise.all([
    getPosts(),
    getUsers(),
    getComments(),
    getCachedData()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Revalidate Tag Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Posts (tag: &apos;posts&apos;)
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                This data is tagged with &apos;posts&apos; and can be revalidated.
              </p>
              <div className="space-y-2">
                {posts.map((post: Post) => (
                  <div key={post.id} className="bg-white dark:bg-gray-700 p-3 rounded border">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.body.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
                Users (tag: &apos;users&apos;)
              </h2>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                This data is tagged with &apos;users&apos; and can be revalidated.
              </p>
              <div className="space-y-2">
                {users.map((user: User) => (
                  <div key={user.id} className="bg-white dark:bg-gray-700 p-3 rounded border">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Comments (tag: &apos;comments&apos;)
              </h2>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                This data is tagged with &apos;comments&apos; and can be revalidated.
              </p>
              <div className="space-y-2">
                {comments.map((comment: Comment) => (
                  <div key={comment.id} className="bg-white dark:bg-gray-700 p-3 rounded border">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">{comment.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{comment.body.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                Cached Data (tag: &apos;cached-data&apos;)
              </h2>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                This data is cached using unstable_cache with tags.
              </p>
              <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Timestamp</h3>
                    <p className="text-lg text-yellow-600 dark:text-yellow-400 font-mono">{cachedData.timestamp}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Random Value</h3>
                    <p className="text-lg text-yellow-600 dark:text-yellow-400 font-mono">{cachedData.randomValue}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Message</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cachedData.message}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
                Revalidation Actions
              </h2>
              <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                Use these buttons to test revalidateTag functionality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form action={async () => {
                  'use server';
                  revalidateTag('posts');
                }}>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Revalidate Posts
                  </button>
                </form>
                
                <form action={async () => {
                  'use server';
                  revalidateTag('users');
                }}>
                  <button 
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Revalidate Users
                  </button>
                </form>
                
                <form action={async () => {
                  'use server';
                  revalidateTag('comments');
                }}>
                  <button 
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Revalidate Comments
                  </button>
                </form>
                
                <form action={async () => {
                  'use server';
                  revalidateTag('cached-data');
                }}>
                  <button 
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Revalidate Cached Data
                  </button>
                </form>
                
                <form action={async () => {
                  'use server';
                  revalidateTag('posts');
                  revalidateTag('users');
                  revalidateTag('comments');
                  revalidateTag('cached-data');
                }}>
                  <button 
                    type="submit"
                    className="w-full md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Revalidate All Tags
                  </button>
                </form>
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

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
                Test Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-indigo-800 dark:text-indigo-200">
                <li>Reload this page multiple times to see the cached data</li>
                <li>Click individual tag revalidation buttons to invalidate specific data</li>
                <li>Click &quot;Revalidate All Tags&quot; to invalidate all tagged data</li>
                <li>After revalidation, reload the page to see fresh data</li>
                <li>Check the timestamps and random values to confirm the data changed</li>
                <li>Notice how only the revalidated tags show new data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 