import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // create users table
  await knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.text('password').notNullable();
      table.timestamps(true, true); // replaces two lines below!
      // table.dateTime('created_at').defaultTo(knex.fn.now());
      // table.dateTime('updated_at').defaultTo(knex.fn.now());
    })
    //  create urls table
    .createTable('urls', (table) => {
      table
        .string('id')
        .defaultTo(knex.raw('substring(md5(random()::text) from 0 for 7)')) // shortened!
        .primary();
      table.text('url').notNullable();

      // foreign key to users table
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable();

      table.timestamps(true, true);
    })
    // create visits table
    .createTable('visits', (table) => {
      table.increments('id').primary();
      table
        .string('url_id')
        .references('id')
        .inTable('urls')
        .onDelete('CASCADE')
        .notNullable(); // foreign key
      table.string('ip').notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  // drop tables in reverse
  await knex.schema.dropTable('visits').dropTable('urls').dropTable('users');
}
