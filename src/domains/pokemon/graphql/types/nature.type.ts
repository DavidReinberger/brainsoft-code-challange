import { enumType } from 'nexus';
import NatureTypeGenerated from '~generated/public/NatureType.js';

export const NatureType = enumType({
  name: 'Nature',
  members: Object.fromEntries(Object.entries(NatureTypeGenerated).map(([key, value]) => [key.replace(' ', ''), value])),
});
