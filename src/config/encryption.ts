import bcrypt from 'bcryptjs';

import { getConfig } from './getConfig';

const { PASSWORD_SALT_ROUNDS } = getConfig();
const SALT_ROUNDS = Number(PASSWORD_SALT_ROUNDS);

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => bcrypt.compare(password, hashedPassword);
