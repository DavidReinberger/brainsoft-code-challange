import { Model } from 'objection';
import { Attacks } from '~domains/pokemon/models/Attacks.model';
import { PokemonsAttacks } from '~domains/pokemon/models/PokemonsAttacks.model';
import { Pokemon } from '~domains/pokemon/models/Pokemon.model';

export class Items extends Model {
  id: string;

  name: string | null;

  static get tableName() {
    return 'items';
  }

  static get idColumns() {
    return 'id';
  }

  static get relationMappings() {
    return {
      pokemon: {
        relation: Model.HasManyRelation,
        modelClass: Pokemon,
        join: {
          from: 'items.id',
          to: 'pokemons.evolutionRequirementId',
        },
      },
    };
  }
}
