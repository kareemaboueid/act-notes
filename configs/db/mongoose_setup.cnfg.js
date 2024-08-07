import mongoose from 'mongoose';
import { NODE_ENV } from '../env/env.cnfg.js';
import logger from '../logging/logger.cnfg.js';

/**
 * ### Sets up a MongoDB connection using the provided MongoDB URI via `mongoose.connect()` method.
 * @param {string} _mongodb_uri - The MongoDB URI to connect to.
 */
const cnfg_mongoose_setup = async (_mongodb_uri) => {
  try {
    // ------ START ------ //

    // define the database connection:
    const db_connect = await mongoose.connect(_mongodb_uri.toString());

    // define the database connection states:
    const db_state_msg = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized',
    };

    // extract the connection details:
    const db_type = db_connect.connection.host ? 'Atlas' : 'local';
    const db_port = db_connect.connection.port;
    const db_name = db_connect.connection.name;
    const db_state = db_connect.connection.readyState;

    // log the connection details: (only in development)
    if (NODE_ENV === 'development') {
      logger.set({ level: 'info', source: 'database' }, [
        `STATE: ${db_state_msg[db_state]}`,
        `PORT: ${db_port}`,
        `HOST: ${db_type}`,
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

export default cnfg_mongoose_setup;
