import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Destructure environment variables
const {
  NODE_ENV,
  PORT,
  SALT_ROUNDS,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLOUD_REAL,
  DB_CLOUD_TEST,
} = process.env;

// Export environment variables
export {
  /**
   * @name NODE_ENV
   * @description The environment the server is running in.
   */
  NODE_ENV,

  /**
   * @name PORT
   * @description The port the server is running on.
   */
  PORT,

  /**
   * @name SALT_ROUNDS
   * @description The number of rounds to use when bcrypting.
   */
  SALT_ROUNDS,

  /**
   * @name DB_USERNAME
   * @description The username for the cloud database.
   */
  DB_USERNAME,

  /**
   * @name DB_PASSWORD
   * @description The password for the cloud database.
   */
  DB_PASSWORD,

  /**
   * @name DB_CLOUD_REAL
   * @description The real cloud database URI.
   */
  DB_CLOUD_REAL,

  /**
   * @name DB_CLOUD_TEST
   * @description The test cloud database URI.
   */
  DB_CLOUD_TEST,
};
