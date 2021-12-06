'use strict';

const express = require(`express`);
const {StatusCodes, ReasonPhrases} = require(`http-status-codes`);
const getApiRoutes = require(`../api`);
const {getLogger, sequelize} = require(`../lib`);
const {SERVICE_LOGGER_NAME} = require(`../constants`);
const {errorLogging, requestLogging} = require(`../middlewares`);
const logger = getLogger({name: SERVICE_LOGGER_NAME});

const API_PREFIX = `/api`;
const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  async run([portFromUser]) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
      await sequelize.sync();
      logger.info(`Connection to database established`);
    } catch (e) {
      logger.error(`Connection to database failed`);
      process.exit(1);
    }

    try {
      const port = portFromUser || DEFAULT_PORT;
      const app = express();

      app.use(express.json());
      app.use(errorLogging);
      app.use(requestLogging);
      app.use(API_PREFIX, await getApiRoutes());

      app.use((req, res) => {
        res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        logger.error(`Route not found: ${req.url}`);
      });

      app.listen(port);
      logger.info(`Listening to connections on ${port}`);

    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
  }
};
