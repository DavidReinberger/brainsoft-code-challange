// import './src/lib/dotenv';
import type { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

// Update with your config settings.
const config: Knex.Config = {
  ...knexSnakeCaseMappers(),
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'example',
    database: 'pokemon',
    ssl: false,
  },
  seeds: {
    directory: './seeds',
    extension: 'ts',
  },
  migrations: {
    schemaName: 'public',
    directory: './migrations',
    loadExtensions: ['.js', '.ts'],
    extension: 'ts',
  },
};

export default config;
