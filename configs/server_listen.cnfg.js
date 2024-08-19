import { NODE_ENV } from './env.cnfg.js';
import logger from '../logging/logger.js';

/**
 * ### Sets up the server to listen on the specified port.
 * @param {object} _app The Express app instance.
 * @param {number} _port The port number to listen on.
 */
const server_listen = (_app, _port) => {
  try {
    // ------ START ------ //

    _app.listen(Number(_port), () => {
      if (NODE_ENV === 'development') {
        logger.set({ level: 'info', source: 'server' }, [
          `Listening [http://127.0.0.1:${_port}]`,
        ]);
      }
    });

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    logger.error({ source: 'server' }, _error);
  }

  // ------ END ------ //
};

export default server_listen;
