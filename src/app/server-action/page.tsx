'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { submitForm } from './actions';

// Submit button component with loading state
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}

export default function ServerActionPage() {
  const [state, formAction, isPending] = useActionState(submitForm, null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8 w-full">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Server Action Demo</CardTitle>
            <CardDescription>
              Submit text using a server action. The result will be displayed with a timestamp.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="text" className="text-sm font-medium">
                  Enter your text
                </label>
                <Input
                  id="text"
                  name="text"
                  type="text"
                  placeholder="Type something here..."
                  required
                  disabled={isPending}
                  className="w-full"
                />
              </div>
              
              {state?.error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {state.error}
                </div>
              )}
              
              <SubmitButton />
            </form>
            
            {state && !state.error && (
              <div className="mt-6 p-4 bg-muted rounded-lg border space-y-2">
                <h3 className="font-semibold text-lg">Result:</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Submitted text:</span>{' '}
                    <span className="text-foreground">{state.text}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Timestamp:</span>{' '}
                    <span className="text-foreground font-mono">
                      {state.timestamp}
                    </span>
                  </p>
                </div>
              </div>
            )}
            
            {isPending && (
              <div className="mt-4 text-sm text-muted-foreground">
                Processing your submission...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

