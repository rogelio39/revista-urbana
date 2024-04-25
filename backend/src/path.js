import { fileURLToPath } from 'url';
import { dirname } from 'path';

const urlpath = fileURLToPath(import.meta.url);
const __dirname = dirname(urlpath);

export default __dirname;