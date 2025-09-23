'use server';

import { validateAccessCode } from '@/ai/flows/validate-access-code';
import { AccessCodeSchema } from '@/lib/schemas';
import { redirect } from 'next/navigation';

export type FormState = {
  message: string;
  success: boolean;
};

export async function handleAccessCodeValidation(
  prevState: FormState,
  formData: FormData
) {
  const validatedFields = AccessCodeSchema.safeParse({
    accessCode: formData.get('accessCode'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input provided.',
      success: false,
    };
  }

  try {
    const result = await validateAccessCode({
      accessCode: validatedFields.data.accessCode,
    });

    if (result.isValid) {
      redirect('/archive');
    } else {
      return {
        message: result.reason || 'Invalid access code.',
        success: false,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred while verifying the code.',
      success: false,
    };
  }
}
