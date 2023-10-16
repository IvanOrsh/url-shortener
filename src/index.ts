import 'dotenv/config';
import knex, { onDatabaseConnect } from './config/knex';
import httpError from 'http-errors';
import { createShortURL } from './services/urls';

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('database is connected');
    // db is ready

    const results = await createShortURL({ url: 'test' }, 1);
    console.log(results);
  } catch (err) {
    // Operational Exception
    if (httpError.isHttpError(err)) {
      console.log('Ignore this error');
      console.log(err);
    } else {
      // Non Operational Exception
      console.log('This is serious!');
      console.log(err);
    }
  }
};

main();
