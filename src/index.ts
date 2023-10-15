import 'dotenv/config';

import { onDatabaseConnect } from './config/knex';

onDatabaseConnect()
  .then(() => console.log('database is connected'))
  .catch((err) => {
    console.log('Error with database connection');
    console.log(err);
  });
