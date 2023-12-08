import { mutationField } from 'nexus';
import { raw } from 'objection';

export const FavoriteMutation = mutationField('TriggerFavorite', {
  type: 'Pokemon',
  args: {
    pokemonId: 'Int',
  },
  async resolve(_, { pokemonId }, context) {
    return (await context.models.pokemon.query()
      .where('id', '=', pokemonId)
      .update({
        favorite: raw('NOT ??', ['favorite']),
      })
      .returning('*')).at(0);
  },
});
