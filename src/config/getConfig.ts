import { z } from 'zod';

export const ConfigSchema = z.object({
  NODE_ENV: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DEBUG: z.string(),
  PASSWORD_SALT_ROUNDS: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

export const getConfig = (): Config => {
  const envVars = process.env;
  const config = ConfigSchema.parse(envVars);

  return config;
};
