import { objectType } from 'nexus';
import { NexusGenEnums } from '~generated/typegen.js';
import processPGArrayToArray from '~helpers/processPGArrayToArray.js';

export const PokemonType = objectType({
  name: 'Pokemon',
  definition(t) {
    t.int('id');
    t.string('name');
    t.nullable.string('commonCaptureArea');
    t.field('classification', { type: 'Classification' });
    t.field('class', { type: 'Class' });
    t.list.nullable.field('types', { type: 'Nature' });
    t.list.nullable.field('resistances', { type: 'Nature' });
    // @ts-expect-error it does exists on the object that is passed to the type from the query
    t.list.nullable.field('weaknesses', { type: 'Nature', resolve: (source) => processPGArrayToArray<NexusGenEnums['Nature']>((source.weaknesses as unknown as string)) });
    t.float('fleeRate');
    t.int('maxCP');
    t.int('maxHP');
    t.boolean('favorite');
    t.field('height', { type: 'MinMax' });
    t.field('weight', { type: 'MinMax' });
  },
});

export const PokemonList = objectType({
  name: 'PokemonList',
  definition(t) {
    t.int('count');
    t.int('totalPages');
    t.list.nullable.field('list', { type: 'Pokemon' });
  },
});
