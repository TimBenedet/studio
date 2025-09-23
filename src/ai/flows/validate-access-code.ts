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

const getVercelBlobData = ai.defineTool({
  name: 'getVercelBlobData',
  description: 'Retrieves data from a Vercel Blob storage.',
  inputSchema: z.object({
    key: z.string().describe('The key to access the data in Vercel Blob storage.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  // TODO: Implement the actual retrieval of data from Vercel Blob.
  // This is a placeholder implementation.
  const accessCode = process.env.HAVILAND_ACCESS_CODE;
  const accessLevel = process.env.HAVILAND_ACCESS_LEVEL;

  if (!accessCode || !accessLevel) {
    return JSON.stringify({isValid: false, accessLevel: 'none', reason: 'Vercel Blob configuration missing.'});
  }
  
  return JSON.stringify({accessCode, accessLevel});
});

const validateAccessCodePrompt = ai.definePrompt({
  name: 'validateAccessCodePrompt',
  input: {schema: ValidateAccessCodeInputSchema},
  output: {schema: ValidateAccessCodeOutputSchema},
  tools: [getVercelBlobData],
  prompt: `You are an access control system for the Archive of Professor L. Haviland.
  A user has entered an access code, and your task is to validate it against the credentials stored securely.

  First, use the getVercelBlobData tool to retrieve the valid access code and associated access level.
  The tool will return a JSON string containing the "accessCode" and "accessLevel" keys.

  Compare the user-provided access code ({{accessCode}}) with the valid access code retrieved from the tool.

  If the access codes match, return isValid as true, and set accessLevel to the retrieved access level.
  If the access codes do not match, return isValid as false, set accessLevel to "none", and provide a reason why access was denied.

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
