'use strict';

const entityValidator = require(`./entityValidator`);
const articleExist = require(`./articleExist`);
const commentExist = require(`./commentExist`);
const errorLogging = require(`./errorLogging`);
const requestLogging = require(`./requestLogging`);

module.exports = {
  entityValidator,
  articleExist,
  commentExist,
  errorLogging,
  requestLogging,
};
