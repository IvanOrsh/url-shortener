import { ZodError, ZodObject, z } from 'zod';
import httpError from 'http-errors';

type RequestBody = { [key: string]: any };

const createShortUrlSchema = z.object({
  id: z
    .string()
    .min(5, { message: 'ID must be at least 5 characters' })
    .max(10, { message: 'ID must not exceed 10 characters' })
    .refine((value) => !['auth', 'urls', 'visits'].includes(value), {
      message: 'The selected id is invalid',
    })
    .optional(),

  url: z
    .string()
    .url({ message: 'The url format is invalid' })
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'URL is required',
    }),
});

const updateShortURLSchema = z.object({
  url: z
    .string()
    .url({ message: 'The url format is invalid' })
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'URL is required',
    }),
});

const registerUserSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters' })
    .max(8, { message: 'Username must not exceed 8 characters' })
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'Username is required',
    }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'Password is required',
    }),
});

const loginUserSchema = z.object({
  username: z
    .string()
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'Username is required',
    }),

  password: z
    .string()
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'Password is required',
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
      throw new httpError.BadRequest(aggregatedErrors.join(', '));
    } else {
      throw new httpError.InternalServerError('Server error');
    }
  }
};

export const validateCreateShortURL = (body: RequestBody) =>
  validateBody(body, createShortUrlSchema);

export const validateUpdateShortURL = (body: RequestBody) =>
  validateBody(body, updateShortURLSchema);

export const validateRegister = (body: RequestBody) =>
  validateBody(body, registerUserSchema);

export const validateLogin = (body: RequestBody) =>
  validateBody(body, loginUserSchema);
