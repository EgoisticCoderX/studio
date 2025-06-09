"use client";

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles } from 'lucide-react';
import { explainCode, type ExplainCodeOutput } from '@/ai/flows/explain-code';

const initialState: ExplainCodeOutput & { error?: string } = {
  explanation: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Explain Code
    </Button>
  );
}

export default function CodeExplainer() {
  const [state, formAction] = useFormState(async (_prevState: any, formData: FormData) => {
    const code = formData.get('code') as string;
    if (!code || code.trim() === '') {
      return { explanation: '', error: 'Please enter some code to explain.' };
    }
    try {
      const result = await explainCode({ code });
      return { ...result, error: undefined };
    } catch (error) {
      console.error("Error explaining code:", error);
      return { explanation: '', error: 'Failed to explain code. Please try again.' };
    }
  }, initialState);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">Code Explainer AI</CardTitle>
          <CardDescription className="text-lg text-foreground/80">
            Paste your code snippet below and let our AI break it down for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div>
              <Textarea
                name="code"
                rows={10}
                placeholder="Enter your code here..."
                className="font-code text-sm bg-secondary/30 border-border focus:ring-primary"
                required
              />
            </div>
            <div className="text-center">
              <SubmitButton />
            </div>
          </form>

          {state.error && (
            <Alert variant="destructive" className="mt-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state.explanation && !state.error && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold font-headline mb-3">Explanation:</h3>
              <Card className="bg-secondary/20 p-4 md:p-6">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-body">
                  {state.explanation}
                </pre>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
