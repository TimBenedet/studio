'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { handleAccessCodeValidation, type FormState } from '@/app/actions';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full font-headline" aria-disabled={pending}>
      {pending ? 'Verifying...' : 'Unlock Archive'}
    </Button>
  );
}

export function AccessForm() {
  const [state, formAction] = useFormState(
    handleAccessCodeValidation,
    initialState
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Card className="w-full max-w-md shadow-lg border-2 border-border/50">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">
          Archive du Professeur L. Haviland
        </CardTitle>
        <CardDescription className="font-body">
          Enter the access code to proceed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="accessCode" className="font-headline">
              Code d'accès
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="accessCode"
                name="accessCode"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="••••••••"
                required
                className="pl-10 text-lg font-code tracking-widest"
              />
              <button
                type="button"
                onMouseDown={() => setIsPasswordVisible(true)}
                onMouseUp={() => setIsPasswordVisible(false)}
                onMouseLeave={() => setIsPasswordVisible(false)}
                onTouchStart={() => setIsPasswordVisible(true)}
                onTouchEnd={() => setIsPasswordVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {state.message && !state.success && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Access Denied</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
