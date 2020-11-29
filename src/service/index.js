'use strict';

const {
  COMMAND,
  USER_ARGV_INDEX,
  EXIT_CODE
} = require(`./constants`);

const {Cli} = require(`./cli`);
const defaultCommand = COMMAND.HELP;

const startAPIService = () => {
  const userArguments = process.argv.slice(USER_ARGV_INDEX);
  const [userCommand, ...argsForCliCommand] = userArguments;

  if (userArguments.length === 0 || !Cli[userCommand]) {
    Cli[defaultCommand].run();
    process.exit(EXIT_CODE.SUCCESS);
  }

  Cli[userCommand].run(argsForCliCommand);
};

startAPIService();
