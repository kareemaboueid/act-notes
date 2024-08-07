import { createLogger, format, transports } from 'winston';

const { combine, prettyPrint } = format;

/**
 * ### Winston Logger Setup
 * @param {string} _level - The level of logging to be used
 * @param {string} _source - The source of the logger
 * @returns {object} - A logger object powered by Winston
 */

function cnfg_winston_setup(_level, _source) {
  // ------ START ------ //

  const log_generator = createLogger({
    level: _level,

    // make a new format for the log message that logger as the following format:
    // [level] short time: message
    format: combine(
      prettyPrint(),
      combine(
        // Options:
        format.label({ label: _source }),
        format.colorize({
          // all: true,
          colors: {
            error: 'red',
            warn: 'yellow',
            info: 'blue',
            debug: 'cyan',
          },
        }),
        // The actual format:
        format.printf(({ level, message, label }) => `${level}.${label}: ${message}`),
      ),
    ),

    // make a new transport for the logger that logs to the console
    transports: [new transports.Console()],
  });

  return log_generator;

  // ------ END ------ //
}

export default cnfg_winston_setup;
