'use server';

import { validateAccessCode } from '@/ai/flows/validate-access-code';
import { AccessCodeSchema } from '@/lib/schemas';

export type FormState = {
  message: string;
  success: boolean;
};

export async function handleAccessCodeValidation(
  prevState: FormState,
  formData: FormData
) {
  console.log('[Action Start] handleAccessCodeValidation triggered.');
  const accessCode = formData.get('accessCode');
  console.log(`[Action Info] formData contains accessCode: "${accessCode}"`);

  const validatedFields = AccessCodeSchema.safeParse({ accessCode });

  if (!validatedFields.success) {
    console.warn('[Action Warn] Invalid input provided:', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'Invalid input provided.',
      success: false,
    };
  }

  try {
    console.log('[Action Info] Calling validateAccessCode flow.');
    const result = await validateAccessCode({
      accessCode: validatedFields.data.accessCode,
    });
    console.log('[Action Info] Received result from flow:', result);

    if (result.isValid) {
      console.log('[Action Success] Access granted.');
      return {
        message: 'Accès autorisé',
        success: true,
      };
    } else {
      console.log('[Action Failure] Access denied. Reason:', result.reason);
      return {
        message: result.reason || 'Accès refusé',
        success: false,
      };
    }
  } catch (error) {
    console.error('[Action Exception] An unexpected error occurred:', error);
    return {
      message: 'An unexpected error occurred while verifying the code.',
      success: false,
    };
  }
}
