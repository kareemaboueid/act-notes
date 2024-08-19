import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

// destructuring the environment variables
export const {
  // GENERAL:
  NODE_ENV,
  PORT,
  SALT_ROUNDS,
  // JWT:
  JWT_NAME,
  JWT_SECRET,
  // DATABASE:
  DB_REAL,
  DB_TEST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_URI,
} = process.env;
