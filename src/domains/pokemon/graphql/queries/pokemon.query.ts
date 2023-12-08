import {
  booleanArg,
  extendType, intArg, nullable, stringArg,
} from 'nexus';
import { NexusGenFieldTypes } from '~generated/typegen';

export const SearchPokemon = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('SearchPokemon', {
      type: 'Pokemon',
      args: {
        number: intArg(),
        name: stringArg(),
      },
      async resolve(root, { number, name }, context) {
        return (await context.models.pokemon.query()
          .where((builder) => builder.where('id', '=', number).orWhere('name', 'LIKE', name))
          .limit(1)).at(0);
      },
    });

    t.field('ListPokemon', {
      type: 'PokemonList',
      args: {
        skip: nullable(intArg()),
        limit: nullable(intArg()),
        name: nullable(stringArg()),
        nature: nullable('Nature'),
        favorite: nullable(booleanArg()),
      },
      async resolve(_, {
        skip = 0, limit = 10, name, nature, favorite,
      }, context) {
        const query = context.models.pokemon.query().orderBy('id');

        if (name) query.where('name', 'LIKE', `%${name}%`);
        if (nature) query.where('type', '&&', [nature]);
        if (typeof favorite === 'boolean') query.where('favorite', '=', favorite);

        const count = await query.resultSize();

        if (count > skip) query.offset(skip);

        const pokemons = await query.limit(limit);

        const totalPages = Math.ceil(count / limit);

        return {
          count: count as number,
          totalPages,
          list: pokemons,
        };
      },
    });
  },
});
