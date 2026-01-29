module.exports = () => {
    const logger = require('./logger').default.child({ class: 'anti-crash' });

    const chalk = require('chalk');

    process.on('uncaughtException', (err) => {
        console.log(chalk.red.bold('[\u274c ANTI-KILL] Uncaught Exception Detected!'));
        console.log(chalk.yellow(`Reason: ${err.message}`));
        console.log(chalk.gray(err.stack));
        // Prevent exit
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.log(chalk.red.bold('[\u274c ANTI-KILL] Unhandled Rejection!'));
        console.log(chalk.yellow(`Reason: ${reason}`));
        // Prevent exit
    });
    
    console.log(chalk.cyan.bold('[ANTI-KILL] Protection Active \u2705'));
};
