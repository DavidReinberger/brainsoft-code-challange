import { extendType, objectType } from 'nexus';

export const AttacksType = objectType({
  name: 'Attacks',
  definition(t) {
    t.list.nullable.field('fast', { type: 'Attack' });
    t.list.nullable.field('special', { type: 'Attack' });
  },
});

export const PokemonWithAttacks = extendType({
  type: 'Pokemon',
  definition(t) {
    t.field(
      'attacks',
      {
        type: 'Attacks',
        async resolve({ id }, _, context) {
          const pokemonsAttacks = await context.models.pokemon.relatedQuery('attacks').for(id);

          return pokemonsAttacks
            .reduce((acc, {
              type,
              nature,
              ...attack
            }) => {
              acc[type.toLowerCase()].push({
                ...attack,
                type: nature,
              });
              return acc;
            }, {
              fast: [],
              special: [],
            });
        },
      },
    );
  },
});
