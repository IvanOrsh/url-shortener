import 'dotenv/config';
import knex, { onDatabaseConnect } from './config/knex';
import { ZodError, z } from 'zod';

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('database is connected');
    // db is ready

    const users = await knex('users').where('id', 1);

    console.log(users[0]?.password);
  } catch (err) {
    console.log('Error with database connection');
    console.log(err);
  }
};

// main();

const schema = z.object({
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
    .min(5, { message: 'URL must be at least 5 characters' })
    .max(15, { message: 'URL must not exceed 15 characters' })
    .or(z.undefined())
    .refine((value) => value !== undefined, {
      message: 'URL is required',
    }),
});

try {
  const validatedData = schema.parse({
    // id: 'asda234',
    // url: 'https://www.google.com',
  });

  console.log('Validator passed');
} catch (error) {
  if (error instanceof ZodError) {
    console.log('Validator failed');
    const aggregatedErrors = error.issues.map((issue) => issue.message);
    console.log(aggregatedErrors);
  } else {
    throw error;
  }
}
