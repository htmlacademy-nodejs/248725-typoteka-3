'use strict';

const fs = require(`fs`);
const path = require(`path`);
const {getLogger} = require(`../lib`);
const {SERVICE_LOGGER_NAME} = require(`../constants`);
const logger = getLogger({name: SERVICE_LOGGER_NAME});

const guidePath = path.resolve(__dirname, `../cli-guide.md`);
const guide = fs.readFileSync(guidePath, `utf-8`);

module.exports = {
  name: `--help`,
  run() {
    logger.info(guide);
  }
};
