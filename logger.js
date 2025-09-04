const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // log INFO and above levels
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, stack }) =>
      stack ? `${timestamp} ${level}: ${message} - ${stack}` : `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new transports.Console(), // logs to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // logs errors to file
    new transports.File({ filename: 'logs/combined.log' }) // logs all messages to file
  ],
});

module.exports = logger;
