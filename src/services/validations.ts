import { ZodError, ZodObject, z } from 'zod';

type RequestBody = { [key: string]: any };

const createShortUrlSchema = z.object({
  id: z
    .string()
    .min(5, { message: 'ID must be at least 5 characters' })
    .max(10, { message: 'ID must not exceed 10 characters' })
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'ID is required',
    }),
  url: z
    .string()
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'URL is required',
    }),
});

const updateShortURLSchema = z.object({
  url: z
    .string()
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'URL is required',
    }),
});

type BodySchema = ZodObject<RequestBody>;

const validateBody = (body: RequestBody, validation_schema: BodySchema) => {
  try {
    const validatedData = validation_schema.parse(body);
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      const aggregatedErrors = error.issues.map((issue) => issue.message);
      // console.log(aggregatedErrors);
      throw new Error(aggregatedErrors.join(', '));
    } else {
      throw error;
    }
  }
};

export const validateCreateShortURL = (body: RequestBody) =>
  validateBody(body, createShortUrlSchema);

export const validateUpdateShortURL = (body: RequestBody) =>
  validateBody(body, updateShortURLSchema);