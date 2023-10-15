import dotenv from 'dotenv';

import { onDatabaseConnect } from './config/knex';

dotenv.config();

onDatabaseConnect()
  .then(() => console.log('database is connected'))
  .catch((err) => {
    console.log('Error with database connection');
    console.log(err);
  });
