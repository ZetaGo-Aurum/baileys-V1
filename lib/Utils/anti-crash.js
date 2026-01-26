
const logger = require('./logger').default.child({ class: 'anti-crash' });

module.exports = () => {
    process.on('uncaughtException', (err) => {
        logger.error(err, 'Uncaught Exception');
    });

    process.on('unhandledRejection', (reason, promise) => {
        logger.error({ reason, promise }, 'Unhandled Rejection');
    });
    
    logger.info('Anti-crash handlers initialized');
};
