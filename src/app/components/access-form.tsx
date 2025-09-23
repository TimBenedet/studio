'use client';

import { useState, useActionState } from 'react';
import { Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { handleAccessCodeValidation, type FormState } from '@/app/actions';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState: FormState = {
  message: '',
  success: false,
};

export function AccessForm() {
  const [state, formAction] = useActionState(
    handleAccessCodeValidation,
    initialState
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <h1 className="text-4xl font-headline text-primary mb-2">
          Archive du Professeur L. Haviland
        </h1>
        <div className="w-full h-px bg-border my-8" />
      </div>
      
      <form action={formAction} className="space-y-6 mt-16">
        <div className="relative">
          <Label
            htmlFor="accessCode"
            className="font-body absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-2 text-muted-foreground"
          >
            Code d'accès
          </Label>
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="accessCode"
            name="accessCode"
            type={isPasswordVisible ? 'text' : 'password'}
            required
            className="bg-transparent border-0 border-b-2 border-border rounded-none px-10 text-center text-2xl font-code tracking-widest focus-visible:ring-0 focus-visible:ring-offset-0"
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

        {state.message && !state.success && (
          <Alert variant="destructive" className="bg-transparent border-none text-center">
            <AlertTriangle className="h-4 w-4 mx-auto" />
            <AlertTitle className="mt-2">Accès Refusé</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}
