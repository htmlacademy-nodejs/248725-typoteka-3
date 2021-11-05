'use strict';

const getMockData = require(`./get-mock-data`);
const {logger, getLogger} = require(`./logger`);
const sequelize = require(`./sequelize`);

module.exports = {
  getMockData,
  logger,
  getLogger,
  sequelize
};
