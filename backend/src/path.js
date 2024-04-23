import { fileURLToPath } from 'url';
import { dirname } from 'path';

const urlpath = fileURLToPath(import.meta.url);
export const __dirname = dirname(urlpath);