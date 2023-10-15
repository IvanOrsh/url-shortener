import Knex from 'knex';

import { getConfig } from './getConfig';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = getConfig();

const knex = Knex({
  client: 'postgresql',
  connection: {
    host: DB_HOST,
    port: +DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
});

export const onDatabaseConnect = async () => knex.raw('SELECT 1');

export default knex;
