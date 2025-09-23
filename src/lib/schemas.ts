import { z } from 'zod';

export const AccessCodeSchema = z.object({
  accessCode: z.string().min(1, { message: 'Access code is required.' }),
});
