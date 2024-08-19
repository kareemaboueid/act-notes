import mongoose from 'mongoose';
import logger from '../../logging/logger.js';
import {
  NODE_ENV,
  DB_REAL,
  DB_TEST,
  DB_USERNAME,
  DB_PASSWORD,
} from '../../configs/env.cnfg.js';

/**
 * ### Connect to the MongoDB database via Mongoose.
 * @param {string} _db_uri The database URI to connect to.
 * @returns {Promise<void>} - Returns a promise (void).
 */
const database_connect = async (_db_uri) => {
  try {
    // ------ START ------ //

    // check if the database URI is provided:
    if (!_db_uri) {
      throw new Error('Database URI is required!');
    }

    // define the database URI:
    const db_uri = _db_uri
      .replace('%USERNAME%', DB_USERNAME)
      .replace('%PASSWORD%', DB_PASSWORD)
      .replace('%DBNAME%', NODE_ENV === 'development' ? DB_TEST : DB_REAL);

    // define the database connection:
    const db_connect = await mongoose.connect(db_uri);
    const db_connection = db_connect.connection;

    // define the database info:
    const db_info = {
      msg: {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
        99: 'uninitialized',
      },
      state: db_connection.readyState,
      host: db_connection.host ? 'Atlas' : 'local',
      name: db_connection.name,
    };

    // log the connection details: (only in development)
    if (NODE_ENV === 'development') {
      logger.set({ level: 'info', source: 'database' }, [
        `(${db_info.name})`,
        `STATUS: ${db_info.msg[db_info.state]}`,
        `HOST: ${db_info.host}`,
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
