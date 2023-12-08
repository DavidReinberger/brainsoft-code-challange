import { enumType } from 'nexus';
import PokemonClass from '~generated/public/PokemonClass';

export const PokemonClassEnum = enumType({
  name: 'Class',
  members: Object.fromEntries(Object.entries(PokemonClass).map(([key, value]) => [key.replace(' ', ''), value])),
});
