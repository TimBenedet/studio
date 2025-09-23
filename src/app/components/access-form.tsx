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
    <div className="w-full max-w-xl flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline text-primary mb-2 whitespace-nowrap">
          Archive du Professeur L. Haviland
        </h1>
        <div className="w-full h-px bg-border my-8" />
      </div>
      
      <form action={formAction} className="space-y-6 mt-16 flex flex-col items-center w-full">
        <div className="flex flex-col items-center space-y-4 w-full">
          <div className="relative w-full max-w-xs flex items-center border-b-2 border-border">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <Label
              htmlFor="accessCode"
              className="font-headline text-muted-foreground text-center flex-grow mx-2"
            >
              Code d'accès
            </Label>
            <Input
              id="accessCode"
              name="accessCode"
              type={isPasswordVisible ? 'text' : 'password'}
              required
              className="bg-transparent border-0 rounded-none text-center text-2xl font-code tracking-widest focus-visible:ring-0 focus-visible:ring-offset-0 w-0 h-0 p-0 absolute"
              autoComplete="off"
            />
            <button
              type="button"
              onMouseDown={() => setIsPasswordVisible(true)}
              onMouseUp={() => setIsPasswordVisible(false)}
              onMouseLeave={() => setIsPasswordVisible(false)}
              onTouchStart={() => setIsPasswordVisible(true)}
              onTouchEnd={() => setIsPasswordVisible(false)}
              className="text-muted-foreground transition-colors hover:text-foreground"
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
