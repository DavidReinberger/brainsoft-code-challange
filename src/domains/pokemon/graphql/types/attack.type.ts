import { objectType } from 'nexus';

export const AttackType = objectType({
  name: 'Attack',
  definition(t) {
    t.string('name');
    t.field('type', { type: 'Nature' });
    t.int('damage');
  },
});
