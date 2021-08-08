'use strict';

const express = require(`express`);
const getApiRoutes = require(`../api`);

const API_PREFIX = `/api`;
const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  async run([portFromUser]) {
    const app = express();
    app.use(express.json());
    app.use(API_PREFIX, await getApiRoutes());
    app.listen(portFromUser || DEFAULT_PORT);
  }
};
