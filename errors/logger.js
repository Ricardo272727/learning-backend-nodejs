const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'info',
      colorize: true
    }),
    new transports.File({ 
      filename: 'ayno.log', 
      level: 'error',
    })
  ]
});

module.exports = logger;
