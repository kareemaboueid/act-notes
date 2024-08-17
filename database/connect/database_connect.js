import mongoose from 'mongoose';
import logger from '../../logging/logger.js';
import {
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLOUD_REAL,
  DB_CLOUD_TEST,
} from '../../configs/env.cnfg.js';

/**
 * ### Connect to the MongoDB database via Mongoose.
 * @returns {Promise<void>} - Returns a promise (void).
 */
const database_connect = async () => {
  try {
    // ------ START ------ //

    // set up the MongoDB URI:
    const db_username = DB_USERNAME;
    const db_password = DB_PASSWORD;
    const db_test = DB_CLOUD_TEST.replace('<U>', db_username).replace(
      '<P>',
      db_password,
    );
    const db_real = DB_CLOUD_REAL.replace('<U>', db_username).replace(
      '<P>',
      db_password,
    );
    const _mongodb_uri = NODE_ENV === 'development' ? db_test : db_real;

    // define the database connection:
    const db_connection = await mongoose.connect(String(_mongodb_uri));

    // define the database connection states and details:
    const db_state_msg = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized',
    };
    const db_state = db_connection.connection.readyState;
    const db_host = db_connection.connection.host ? 'Atlas' : 'local';
    const db_port = db_connection.connection.port;
    const db_name = db_connection.connection.name;

    // log the connection details: (only in development)
    if (NODE_ENV === 'development') {
      logger.set({ level: 'info', source: 'database' }, [
        `STATE: ${db_state_msg[db_state]}`,
        `HOST: ${db_host}`,
        `PORT: ${db_port}`,
        `DB: ${db_name}`,
      ]);
    }

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error:
    logger.error({ source: 'database' }, _error);
  }

  // ------ END ------ //
};

export default database_connect;
