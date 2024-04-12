import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') })

const getEnvVar = (value) => {
  if (!process.env[value]) {
    throw new Error(`Environment variable ${value} is not set.`);
  }
  return process.env[value];
}

export default {
  port: getEnvVar('PORT'),
  dbHost: getEnvVar('DB_HOST'),
  dbUser: getEnvVar('DB_USER'),
  dbPassword: getEnvVar('DB_PASSWORD'),
  dbName: getEnvVar('DB_NAME'),
}