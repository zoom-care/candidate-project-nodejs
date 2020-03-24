const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  defaultMeta: { service: 'zoomkevan-service' },
  transports: [
    new transports.Console()
  ]
});

module.exports = logger;
