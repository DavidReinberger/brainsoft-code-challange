import { extendType } from 'nexus';
import { Pokemon } from '~domains/pokemon/models/Pokemon.model';

// This could be definitely better to filter the results in the database instead of in JS
export const PokemonWithEvolutions = extendType({
  type: 'Pokemon',
  definition(t) {
    t.list.nullable.field('evolutions', {
      type: 'Pokemon',
      async resolve(root) {
        const evolutions = await Pokemon
          .relatedQuery('evolutions')
          .for(root.id);
        return evolutions.filter(({ id }) => id > root.id);
      },
    });

    t.list.nullable.field('previousEvolutions', {
      type: 'Pokemon',
      async resolve(root) {
        const evolutions = await Pokemon
          .relatedQuery('evolutions')
          .for(root.id);
        return evolutions.filter(({ id }) => id < root.id);
      },
    });
  },
});
