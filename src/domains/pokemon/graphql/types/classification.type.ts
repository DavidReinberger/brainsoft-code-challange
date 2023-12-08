import { enumType } from 'nexus';
import PokemonClassification from '~generated/public/PokemonClassification.js';

export const ClassificationType = enumType({
  name: 'Classification',
  members: Object.fromEntries(Object.entries(PokemonClassification).map(([key, value]) => [key.replace(' ', ''), value])),
});
