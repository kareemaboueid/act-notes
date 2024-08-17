import * as dotenv from 'dotenv';

dotenv.config();

// destructuring the environment variables
export const {
  NODE_ENV,
  PORT,
  SALT_ROUNDS,
  JWT_NAME,
  JWT_SECRET,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLOUD_REAL,
  DB_CLOUD_TEST,
} = process.env;
