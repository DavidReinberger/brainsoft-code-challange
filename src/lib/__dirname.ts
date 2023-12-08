import { fileURLToPath } from 'url';
import path from 'path';

// @ts-expect-error This is needed to replaace
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
