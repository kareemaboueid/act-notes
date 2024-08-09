import { NODE_ENV } from '../env/env.cnfg.js';
import cnfg_winston_setup from './winston_setup.cnfg.js';

/** ### General Logger */
const logger = {
  // ------ START ------ //

  /**
   * #### Set Logger
   * @param {object} _log_options The options for the log.
   * @param {string} _log_source The source of the log.
   * @example
   * logger.set({level: 'info', source: 'app'}, 'Server listening on port 3000');
   */
  set: (_log_options = { _level: {}, _source: {} }, _log_message = []) => {
    _log_options._level = _log_options || { level: 'info' };
    _log_options._source = _log_options || { source: 'app' };

    const { level } = _log_options._level;
    const { source } = _log_options._source;
    const messages = Array.isArray(_log_message) ? _log_message : [_log_message];

    const log = cnfg_winston_setup(level, source);
    log.log(level, messages.join(' | '));
  },

  /**
   * #### Log Error
   * @param {object} _log_source The source of the log.
   * @param {string} _error_message The error message to log.
   * @example
   * logger.error({source: 'app'}, 'Error message');
   */
  error: (_log_options = { _source: {} }, _error_message = '') => {
    _log_options._source = _log_options || { source: 'app' };

    const { source } = _log_options._source;

    const log = cnfg_winston_setup('error', source);
    log.error(_error_message);
  },

  /**
   * #### Log environment variables
   * @param {object} _log_options The options for the log.
   * @param {string} _log_source The source of the log.
   * @example
   * logger.env({level: 'debug'});
   */
  env: (_log_options = { _level: {} }) => {
    _log_options._level = _log_options || { level: 'debug' };

    const { level } = _log_options._level;

    const log = cnfg_winston_setup(level, 'enviroment');
    log.log(level, NODE_ENV);
  },

  /**
   * #### Log Schema Strict Mode
   * @param {string} _name The name of the schema.
   * @param {boolean} _model The model of the schema.
   * @example
   * logger.is_schema_strict('User', User_model.schema.options.strict);
   */
  is_schema_strict: (_name, _model) => {
    const log = cnfg_winston_setup('info', 'schema');
    log.log('info', `${_name} strict mode: ${_model}`);
  },

  // ------ END ------ //
};

export default logger;
