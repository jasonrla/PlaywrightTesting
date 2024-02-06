import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(currentDir, '../../.env');
dotenv.config({ path: envPath });

const environment = process.env.ENVIRONMENT || 'dev';
console.log(`Loading config for environment: ${environment.toUpperCase()}`);

const configModule = await import(`../../config/${environment}.config`);
export const config = configModule.default;
