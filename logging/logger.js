import { NODE_ENV } from '../configs/env.cnfg.js';
import winston_setup from './winston_setup.js';

/**
 * ### Logger Module for Logging Messages and Errors to the Console
 * @module logger
 */
const logger = {
  // ------ START ------ //

  /**
   * #### Set Logger
   * @description Sets the logger with the provided options and message.
   * @param {Object} _log_options - The options for the log.
   * @param {(string|string[])} _log_message - The message to log.
   */
  set: (_log_options, _log_message = [] || '') => {
    const { level } = _log_options;
    const { source } = _log_options;

    const messages = Array.isArray(_log_message)
      ? _log_message
      : [_log_message];

    const log = winston_setup(level, source);
    log.log(level, messages.join(', '));
  },
  // ---------------------------------------------------------

  /**
   * #### Log Error
   * @description Logs an error message to the console.
   * @param {Object} _log_options - The options for the log.
   * @param {string} _error_message - The error message to log.
   */
  error: (_source = { source: '' }, _error_message = '') => {
    const { source } = _source;

    const log = winston_setup('error', source);
    log.error(_error_message);
  },
  // ---------------------------------------------------------

  /**
   * #### Log NODE ENV exlusively
   * @description Logs the current NODE_ENV to the console.
   * @param {Object} _log_options - The options for the log.
   */
  node_env: (_log_options = {}) => {
    const { level } = _log_options;

    const log = winston_setup(level, 'NODE_ENV');
    log.log(level, NODE_ENV);
  },
  // ---------------------------------------------------------

  /**
   * #### Log Schema Strict Mode
   * @description Logs the strict mode status of a schema to the console.
   * @param {string} _model_name - The name of the model
   * @param {boolean} _schema_strict_option - The strict mode option of the schema
   * @example
   * logger.is_schema_strict('User', User_model.schema.options.strict);
   */
  is_schema_strict: (_model_name, _schema_strict_option) => {
    const level = 'debug';
    const log = winston_setup(level, 'schema');
    log.log(level, `${_model_name} strict: ${_schema_strict_option}`);
  },
  // ---------------------------------------------------------

  // ------ END ------ //
};

export default logger;
