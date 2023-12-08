// import '../seeds/pokemon';
import { Model, ModelObject } from 'objection';
import PokemonClassification from '~generated/public/PokemonClassification';
import NatureType from '~generated/public/NatureType';
import PokemonClass from '~generated/public/PokemonClass';
import processPGArrayToArray from '~helpers/processPGArrayToArray';
import { NexusGenEnums } from '~generated/typegen';
import { Items } from './Items.model';
import { Attacks } from './Attacks.model';
import { PokemonsAttacks } from './PokemonsAttacks.model';

export class Pokemon extends Model {
  id: number;

  name: string | null;

  classification: PokemonClassification | null;

  commonCaptureArea: string | null;

  class: PokemonClass | null;

  type: NatureType[] | null;

  resistant: NatureType[] | null;

  weaknesses: NatureType[] | null;

  heightMin: number | null;

  heightMax: number | null;

  weightMin: number | null;

  weightMax: number | null;

  fleeRate: number | null;

  evolutionRequirementAmount: number | null;

  evolutionRequirement: Items | null;

  maxCp: number | null;

  maxHp: number | null;

  attacks: Attacks[] | null;

  evolutions: this[] | null;

  favorite: boolean;

  static get virtualFields() {
    return [
      'types',
      'resistances',
      'height',
      'maxCP',
      'maxHP',
      'weight',
    ];
  }

  static get tableName() {
    return 'pokemons';
  }

  static get idColumns() {
    return 'id';
  }

  get types() {
    return processPGArrayToArray<NexusGenEnums['Nature']>((this.type as unknown as string));
  }

  get resistances() {
    return processPGArrayToArray<NexusGenEnums['Nature']>(this.resistant as unknown as string);
  }

  get height() {
    return {
      minimum: `${this.heightMin}m`,
      maximum: `${this.heightMax}m`,
    };
  }

  get maxCP() {
    return this.maxCp;
  }

  get maxHP() {
    return this.maxHp;
  }

  get weight() {
    return {
      minimum: `${this.weightMin}Kg`,
      maximum: `${this.weightMax}Kg`,
    };
  }

  static get relationMappings() {
    return {
      evolutionRequirement: {
        relation: Model.HasOneRelation,
        modelClass: Items,
        join: {
          from: 'pokemons.evolutionRequirementId',
          to: 'items.id',
        },
      },
      evolutions: {
        relation: Model.ManyToManyRelation,
        modelClass: this,
        join: {
          from: 'pokemons.id',
          to: 'pokemons.id',
          through: {
            from: 'pokemons_evolutions.pokemon_id',
            to: 'pokemons_evolutions.evolution_id',
          },
        },
      },
      attacks: {
        relation: Model.ManyToManyRelation,
        modelClass: Attacks,
        join: {
          from: 'pokemons.id',
          through: {
            from: 'pokemonsAttacks.pokemonId',
            to: 'pokemonsAttacks.attackId',
            modelClass: PokemonsAttacks,
          },
          to: 'attacks.id',
        },
      },
    };
  }
}

export type PokemonType = ModelObject<Pokemon>;
