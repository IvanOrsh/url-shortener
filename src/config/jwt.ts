import jwt from 'jsonwebtoken';
import httpError from 'http-errors';

import { getConfig } from './getConfig';

const { JWT_PRIVATE_KEY } = getConfig();

export const generateToken = async (payload: { [key: string]: any }) =>
  jwt.sign(payload, JWT_PRIVATE_KEY, {
    expiresIn: '365d',
  });

export const validateJWT = async (token: string) => {
  try {
    const content = jwt.verify(token, JWT_PRIVATE_KEY);
    return content as { [key: string]: any };
  } catch (e) {
    throw new httpError.Unauthorized('Please provide a valid token');
  }
};
