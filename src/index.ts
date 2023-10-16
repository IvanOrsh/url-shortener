import 'dotenv/config';
import Koa from 'koa';
import cors from '@koa/cors';
import koaHelmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import httpError from 'http-errors';

import { getConfig } from './config/getConfig';
import { onDatabaseConnect } from './config/knex';

const { PORT } = getConfig();

const app = new Koa();

app.use(cors());
app.use(koaHelmet());
app.use(bodyParser());

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('database is connected');
    // db is ready

    app.listen(Number(PORT), () => {
      console.log(`Server started with port ${PORT}`);
    });
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
