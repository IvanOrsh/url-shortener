import 'dotenv/config';
import knex, { onDatabaseConnect } from './config/knex';

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('database is connected');
    // db is ready

    const users = await knex('users').where('id', 1);

    console.log(users[0]?.password);
  } catch (err) {
    console.log('Error with database connection');
    console.log(err);
  }
};

main();
