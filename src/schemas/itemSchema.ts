import { z } from 'zod';

/**
 * Zod Schema for Campus Lost and Found Item Submission
 * Enforces domain validation rules for reporting items discovered or lost on campus.
 */
export const itemSchema = z
  .object({
    title: z
      .string()
      .min(3, 'Item title must be at least 3 characters long')
      .max(80, 'Item title cannot exceed 80 characters'),
    description: z
      .string()
      .min(10, 'Please provide a detailed description (at least 10 characters)'),
    location: z
      .string()
      .min(3, 'Campus location is required (e.g. Library Study Room B, Main Cafeteria)'),
    status: z.enum(['lost', 'found'], {
      error: 'Please select whether the item was lost or found',
    }),
    categoryId: z
      .string()
      .min(1, 'Please select a valid item category'),
    dateReported: z
      .string()
      .min(1, 'Date reported is required'),
  })
  // Domain refinement: Prevent reporting items with future timestamps
  .refine(
    (data) => {
      const reported = new Date(data.dateReported);
      const now = new Date();
      // Allow up to 5 minutes buffer for network/clock skew
      return reported.getTime() <= now.getTime() + 5 * 60 * 1000;
    },
    {
      message: 'Date reported cannot be in the future',
      path: ['dateReported'],
    }
  );

/**
 * Inferred TypeScript type from the Zod schema
 * Auto-derived using z.infer (No manual interface written)
 */
export type ItemFormValues = z.infer<typeof itemSchema>;
