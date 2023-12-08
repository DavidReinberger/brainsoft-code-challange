import * as path from 'path';
import { makeSchema } from 'nexus';
import * as PokemonTypes from '~domains/pokemon/graphql/types/pokemon.type';
import * as ClassificationTypes from '~domains/pokemon/graphql/types/classification.type';
import * as NatureTypes from '~domains/pokemon/graphql/types/nature.type';
import * as EvolutionRequirementTypes from '~domains/pokemon/graphql/types/evolutionRequirement.type';
import * as EvolutionTypes from '~domains/pokemon/graphql/types/evolution.type';
import * as AttackTypes from '~domains/pokemon/graphql/types/attack.type';
import * as AttacksTypes from '~domains/pokemon/graphql/types/attacks.type';
import * as MinMaxTypes from '~domains/pokemon/graphql/types/minMax.type';
import * as pokemonQueries from '~domains/pokemon/graphql/queries/pokemon.query';
import { PokemonClassEnum } from '~domains/pokemon/graphql/types/class.enum';
import { NaturesQuery } from '~domains/pokemon/graphql/queries/natures.query';
import { FavoriteMutation } from '~domains/pokemon/graphql/mutations/favorite.mutation';
import { __dirname } from './__dirname';

const schema = makeSchema({
  types: [
    PokemonTypes,
    ClassificationTypes,
    NatureTypes,
    EvolutionRequirementTypes,
    EvolutionTypes,
    PokemonClassEnum,
    AttackTypes,
    AttacksTypes,
    MinMaxTypes,
    pokemonQueries,
    NaturesQuery,
    FavoriteMutation,
  ],
  contextType: {
    module: path.join(__dirname, '../lib/graphqlContext.ts'),
    export: 'AppContext',
  },
  nonNullDefaults: {
    output: true,
  },
  outputs: {
    schema: path.join(__dirname, '../generated/schema.graphql'),
    typegen: path.join(__dirname, '../generated/typegen.ts'),
  },
});

export default schema;
