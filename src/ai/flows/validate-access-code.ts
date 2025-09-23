'use server';

/**
 * @fileOverview Validates the access code entered by the user against credentials stored in Vercel Blob.
 *
 * - validateAccessCode - A function that validates the access code.
 * - ValidateAccessCodeInput - The input type for the validateAccessCode function.
 * - ValidateAccessCodeOutput - The return type for the validateAccessCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { list, head } from '@vercel/blob';

const ValidateAccessCodeInputSchema = z.object({
  accessCode: z.string().describe('The access code entered by the user.'),
});
export type ValidateAccessCodeInput = z.infer<typeof ValidateAccessCodeInputSchema>;

const ValidateAccessCodeOutputSchema = z.object({
  isValid: z.boolean().describe('Indicates whether the access code is valid.'),
  accessLevel: z.string().describe('The access level granted to the user.'),
  reason: z.string().describe('The reason for the validation result.')
});
export type ValidateAccessCodeOutput = z.infer<typeof ValidateAccessCodeOutputSchema>;

export async function validateAccessCode(input: ValidateAccessCodeInput): Promise<ValidateAccessCodeOutput> {
  return validateAccessCodeFlow(input);
}

const getPasswordFromBlob = ai.defineTool({
  name: 'getPasswordFromBlob',
  description: 'Retrieves the password from the mdp.md file in Vercel Blob storage.',
  inputSchema: z.object({}),
  outputSchema: z.string(),
}, async () => {
  try {
    const blobToken = process.env.Game1_READ_WRITE_TOKEN;
    if (!blobToken) {
      throw new Error('Game1_READ_WRITE_TOKEN environment variable is not set.');
    }

    const { blobs } = await list({
      prefix: 'Connection/mdp.md',
      limit: 1,
      token: blobToken
    });

    if (blobs.length === 0) {
      throw new Error('Password file not found in Vercel Blob.');
    }

    const passwordFile = blobs[0];
    const response = await fetch(passwordFile.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch password file: ${response.statusText}`);
    }
    const password = await response.text();
    return password.trim();
  } catch (error) {
    console.error('Error fetching password from Vercel Blob:', error);
    return '';
  }
});

const validateAccessCodePrompt = ai.definePrompt({
  name: 'validateAccessCodePrompt',
  input: {schema: ValidateAccessCodeInputSchema},
  output: {schema: ValidateAccessCodeOutputSchema},
  tools: [getPasswordFromBlob],
  prompt: `You are an access control system for the Archive of Professor L. Haviland.
  A user has entered an access code, and your task is to validate it against the credentials stored securely.

  First, use the getPasswordFromBlob tool to retrieve the valid access code.

  Compare the user-provided access code ({{accessCode}}) with the valid access code retrieved from the tool.

  If the access codes match, return isValid as true, and set accessLevel to "full".
  If the access codes do not match, return isValid as false, set accessLevel to "none", and provide a reason why access was denied in French, like "Code d'accès incorrect.".

  Ensure that the output is a valid JSON object conforming to the ValidateAccessCodeOutputSchema.
`,
});

const validateAccessCodeFlow = ai.defineFlow(
  {
    name: 'validateAccessCodeFlow',
    inputSchema: ValidateAccessCodeInputSchema,
    outputSchema: ValidateAccessCodeOutputSchema,
  },
  async input => {
    const {output} = await validateAccessCodePrompt(input);
    return output!;
  }
);
