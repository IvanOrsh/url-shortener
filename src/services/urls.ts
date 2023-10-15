// user_id is going to be validated through our api

import knex from '../config/knex';

export const createShortURL = async (
  body: { url: string; id?: string },
  user_id: number,
) => {
  // validate manually
  if (!body.url) {
    throw new Error('URL is required');
  }

  if (body.id) {
    const current_record = await knex('urls').where({ id: body.id }).first();
    if (current_record) {
      throw new Error(
        'The id that you provided already exists in our database',
      );
    }
  }

  const results = await knex('urls').insert(
    { url: body.url, id: body.id, user_id },
    '*',
  );

  return results;
};

export const resolveURL = async (id: string) => {
  const url = await knex('urls').where({ id }).select('url').first();

  if (!url) {
    throw new Error('The id is not valid');
  }

  return url.url;
};
