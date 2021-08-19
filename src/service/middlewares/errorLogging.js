'use strict';

const {getLogger} = require(`../lib`);
const {SERVICE_LOGGER_NAME} = require(`../constants`);
const logger = getLogger({name: SERVICE_LOGGER_NAME});

module.exports = (err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
};
