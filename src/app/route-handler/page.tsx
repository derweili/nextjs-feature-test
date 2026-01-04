'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Fetcher function for useSWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch');
  }
  return res.json();
};

// POST function
async function postData(text: string) {
  const res = await fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to submit');
  }
  
  return res.json();
}

export default function RouteHandlerPage() {
  const [submittedText, setSubmittedText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<{
    text: string;
    timestamp: string;
  } | null>(null);

  // Fetch data using useSWR (GET request)
  const { data, error, isLoading, isValidating, mutate } = useSWR('/api/data', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Handle form submission (POST request)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitResult(null);

    try {
      const result = await postData(submittedText);
      setSubmitResult({
        text: result.data.text,
        timestamp: result.timestamp,
      });
      setSubmittedText('');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-8 w-full">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* GET Request Section */}
        <Card>
          <CardHeader>
            <CardTitle>GET Request (useSWR)</CardTitle>
            <CardDescription>
              Fetch data from the route handler using useSWR. Click refresh to refetch.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => mutate()}
                disabled={isLoading || isValidating}
                variant="outline"
              >
                {isLoading || isValidating ? 'Loading...' : 'Refresh Data'}
              </Button>
            </div>

            {(isLoading || isValidating) && (
              <div className="text-sm text-muted-foreground">
                Loading data...
              </div>
            )}

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                Error: {error.message}
              </div>
            )}

            {data && (
              <div className="p-4 bg-muted rounded-lg border space-y-2">
                <h3 className="font-semibold text-lg">Fetched Data:</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Message:</span>{' '}
                    <span className="text-foreground">{data.message}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Text:</span>{' '}
                    <span className="text-foreground">{data.data.text}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Random Value:</span>{' '}
                    <span className="text-foreground font-mono">
                      {data.data.randomValue}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Timestamp:</span>{' '}
                    <span className="text-foreground font-mono">
                      {data.timestamp}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* POST Request Section */}
        <Card>
          <CardHeader>
            <CardTitle>POST Request</CardTitle>
            <CardDescription>
              Submit text to the route handler using a POST request.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="text" className="text-sm font-medium">
                  Enter your text
                </label>
                <Input
                  id="text"
                  type="text"
                  placeholder="Type something here..."
                  value={submittedText}
                  onChange={(e) => setSubmittedText(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full"
                />
              </div>

              {submitError && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {submitError}
                </div>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>

            {isSubmitting && (
              <div className="text-sm text-muted-foreground">
                Processing your submission...
              </div>
            )}

            {submitResult && (
              <div className="mt-4 p-4 bg-muted rounded-lg border space-y-2">
                <h3 className="font-semibold text-lg">Result:</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Submitted text:</span>{' '}
                    <span className="text-foreground">{submitResult.text}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Timestamp:</span>{' '}
                    <span className="text-foreground font-mono">
                      {submitResult.timestamp}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

