import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

const connection = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'example',
    database: 'pokemon',
    ssl: false,
  },
  ...knexSnakeCaseMappers(),
});

export default connection;
