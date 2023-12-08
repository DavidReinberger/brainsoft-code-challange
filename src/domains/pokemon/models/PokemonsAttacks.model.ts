import { Model, ModelObject } from 'objection';

export class PokemonsAttacks extends Model {
  id: string;

  pokemonId: string | null;

  attackId: string | null;

  static get tableName() {
    return 'pokemonsAttacks';
  }

  static get idColumns() {
    return 'id';
  }
}

export type PokemonsAttacksType = ModelObject<PokemonsAttacks>;
