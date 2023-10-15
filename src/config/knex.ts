import dotenv from 'dotenv';
import Knex from 'knex';

import { getConfig } from './getConfig';

dotenv.config();

const config = getConfig();

const knex = Knex({
  client: 'postgresql',
  connection: {
    host: config.DB_HOST,
    port: +config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
  },
});

export const onDatabaseConnect = async () => knex.raw('SELECT 1');

export default knex;
