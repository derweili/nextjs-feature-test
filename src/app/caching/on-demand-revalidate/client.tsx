'use client';

import { useTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import { revalidateByTag, revalidateByPath } from './actions';

export function OnDemandRevalidateClient() {
  const [tagPending, startTagTransition] = useTransition();
  const [pathPending, startPathTransition] = useTransition();
  const [tagResult, setTagResult] = useState<{ success: boolean; message: string } | null>(null);
  const [pathResult, setPathResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleRevalidateTag = () => {
    setTagResult(null);
    startTagTransition(async () => {
      const result = await revalidateByTag('time-data');
      setTagResult(result);
    });
  };

  const handleRevalidatePath = () => {
    setPathResult(null);
    startPathTransition(async () => {
      const result = await revalidateByPath('/caching/on-demand-revalidate');
      setPathResult(result);
    });
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
        Revalidation Actions
      </h2>
      <p className="text-sm text-green-700 dark:text-green-300 mb-4">
        Use these buttons to test on-demand revalidation functionality.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Revalidate by Tag */}
        <div className="space-y-3">
          <Button
            onClick={handleRevalidateTag}
            disabled={tagPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {tagPending ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span>
                Revalidating...
              </>
            ) : (
              'Revalidate by Tag'
            )}
          </Button>
          
          {tagResult && (
            <div className={`p-3 rounded-md ${
              tagResult.success 
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' 
                : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
            }`}>
              <p className={`text-sm font-medium mb-2 ${
                tagResult.success 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {tagResult.success ? '✓ Success' : '✗ Error'}
              </p>
              <p className={`text-xs ${
                tagResult.success 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {tagResult.message}
              </p>
              {tagResult.success && (
                <Button
                  onClick={handleReload}
                  size="sm"
                  variant="outline"
                  className="mt-2 w-full text-xs"
                >
                  Reload Page
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Revalidate by Path */}
        <div className="space-y-3">
          <Button
            onClick={handleRevalidatePath}
            disabled={pathPending}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {pathPending ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span>
                Revalidating...
              </>
            ) : (
              'Revalidate by Path'
            )}
          </Button>
          
          {pathResult && (
            <div className={`p-3 rounded-md ${
              pathResult.success 
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' 
                : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
            }`}>
              <p className={`text-sm font-medium mb-2 ${
                pathResult.success 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {pathResult.success ? '✓ Success' : '✗ Error'}
              </p>
              <p className={`text-xs ${
                pathResult.success 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {pathResult.message}
              </p>
              {pathResult.success && (
                <Button
                  onClick={handleReload}
                  size="sm"
                  variant="outline"
                  className="mt-2 w-full text-xs"
                >
                  Reload Page
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

