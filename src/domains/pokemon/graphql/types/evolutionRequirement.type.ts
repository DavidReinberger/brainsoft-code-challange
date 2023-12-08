import { extendType, objectType } from 'nexus';
import { Pokemon } from '~domains/pokemon/models/Pokemon.model';

export const EvolutionRequirementType = objectType({
  name: 'EvolutionRequirement',
  definition(t) {
    t.string('name');
    t.int('amount');
  },
});

export const PokemonWithEvolutionRequirement = extendType({
  type: 'Pokemon',
  definition(t) {
    t.nullable.field(
      'evolutionRequirements',
      {
        type: 'EvolutionRequirement',
        async resolve(root, _, context) {
          // @ts-expect-error exists on the type that is passed to the resolver from the top
          if (typeof root.evolutionRequirementAmount === 'number') {
            return {
              name: (await context.models.pokemon.relatedQuery('evolutionRequirement')).at(0).name,
              // @ts-expect-error exists on the type that is passed to the resolver from the top
              amount: root.evolutionRequirementAmount,
            };
          }
          return null;
        },
      },
    );
  },
});
