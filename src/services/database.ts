import { Model } from 'objection';
import connection from './connection';

Model.knex(connection);

export type db = typeof Model;
export default Model;
