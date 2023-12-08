import { objectType } from 'nexus';

// Probably a good idea to move somewhere else
export const MinMaxType = objectType({
  name: 'MinMax',
  definition(t) {
    t.string('minimum');
    t.string('maximum');
  },
});
