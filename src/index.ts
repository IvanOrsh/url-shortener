import 'dotenv/config';
import knex, { onDatabaseConnect } from './config/knex';

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('database is connected');
    // db is ready

    const user = await knex('users')
      .select(['username'])
      .where('id', 1)
      .first();
    console.log(user);

    await knex('urls').where('id', '478a92').delete();

    const urls = await knex('urls');

    console.log(urls);
  } catch (err) {
    console.log('Error with database connection');
    console.log(err);
  }
};

main();
