import { Model } from 'objection';
import NatureType from '~generated/public/NatureType';
import AttackType from '~generated/public/AttackType';
import { PokemonsAttacks } from './PokemonsAttacks.model';

export class Attacks extends Model {
  id: string;

  name: string | null;

  nature: NatureType | null;

  type: AttackType | null;

  damage: number | null;

  static get tableName() {
    return 'attacks';
  }

  static get idColumns() {
    return 'id';
  }

  static get relationMappings() {
    return {
      pokemons: {
        relation: Model.ManyToManyRelation,
        modelClass: Attacks,
        join: {
          to: 'pokemons.id',
          through: {
            to: 'pokemonsAttacks.pokemonId',
            from: 'pokemonsAttacks.attackId',
            modelClass: PokemonsAttacks,
          },
          from: 'attacks.id',
        },
      },
    };
  }
}
