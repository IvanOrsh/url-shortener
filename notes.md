## For testing purposes: db

```bash
DB_HOST="postgres"
DB_PORT="5432"
DB_NAME="mydatabase"
DB_USER="myuser"
DB_PASSWORD="mypassword"

psql -h $DB_HOST -p $DB_PORT -d $DB_NAME -U $DB_USER -W
```

## Typical knex usage, but docs are still the best!

### setting up connection

```ts
import Knex from 'knex';

import { getConfig } from './getConfig'; // zod stuffs

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
```

### establishing connection

```ts
import 'dotenv/config';
import knex, { onDatabaseConnect } from './config/knex';

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('database is connected');
    // db is ready

    // do stuffs here!
  } catch (err) {
    console.log('Error with database connection');
    console.log(err);
  }
};

main();
```

### retrieving data:

```ts
const users = await knex('users').select(['username']).where('id', 1).first();
```

### inserting data:

```ts
// here we specified (, '*') that we want to
// return inserted row
const newUser = await knex('users').insert(
  {
    username: 'test2',
    password: 'test',
  },
  '*',
);
```

### deleting

```ts
const newUrl = await knex('urls').where('id', '478a92').delete();
```

## Integrating TS and knex (example)

src/types/index.ts:

```ts
export interface User {
  id: number;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface Url {
  id: string;
  url: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Visit {
  id: number;
  url_id: string;
  ip: string;
  created_at: Date;
  updated_at: Date;
}

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    urls: Url;
    visits: Visit;
  }
}
```
