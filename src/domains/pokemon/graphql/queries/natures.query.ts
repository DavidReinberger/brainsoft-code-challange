import { extendType } from 'nexus';
import NatureType from '~generated/public/NatureType';

const NatureTypeValues = Object.values(NatureType);

export const NaturesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.nullable.field('PokemonNatures', {
      type: 'Nature',
      resolve() {
        return NatureTypeValues;
      },
    });
  },
});
