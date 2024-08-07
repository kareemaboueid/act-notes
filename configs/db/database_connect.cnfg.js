import {
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLOUD_REAL,
  DB_CLOUD_TEST,
} from '../env/env.cnfg.js';
import Logger from '../logging/logger.cnfg.js';
import cnfg_mongoose_setup from './mongoose_setup.cnfg.js';

/**
 * ### Connects to the CLOUD MongoDB database using the provided MongoDB URI.
 * @returns {Promise<void>} - A promise that resolves if the connection is successful.
 */
const database_connect = async () => {
  try {
    // ------ START ------ //

    // set up the MongoDB URI:
    const db_username = DB_USERNAME;
    const db_password = DB_PASSWORD;
    const db_test = DB_CLOUD_TEST.replace('<U>', db_username).replace('<P>', db_password);
    const db_real = DB_CLOUD_REAL.replace('<U>', db_username).replace('<P>', db_password);
    const _mongodb_uri = NODE_ENV === 'development' ? db_test : db_real;

    // set up the MongoDB connection:
    await cnfg_mongoose_setup(_mongodb_uri);

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error:
    Logger.error({ source: 'database' }, _error);
  }

  // ------ END ------ //
};

export default database_connect;
