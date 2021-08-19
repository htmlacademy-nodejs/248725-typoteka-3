'use strict';

const {getLogger} = require(`../lib`);
const {SERVICE_LOGGER_NAME} = require(`../constants`);
const packageJsonFile = require(`../../../package.json`);
const logger = getLogger({name: SERVICE_LOGGER_NAME});

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    logger.info(version);
  }
};
