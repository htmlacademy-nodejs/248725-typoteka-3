'use strict';

const {getLogger} = require(`../lib`);
const {SERVICE_LOGGER_NAME} = require(`../constants`);
const logger = getLogger({name: SERVICE_LOGGER_NAME});

module.exports = (req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
};
