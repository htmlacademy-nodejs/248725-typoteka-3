'use strict';

const USER_ARGV_INDEX = 2;
const ID_LENGTH = 6;
const MS_IN_MONTH = 2629746000;
const TIME_RANGE_IN_MONTHS = 3;
const DEFAULT_ARTICLE_NUMBER = 1;
const MAX_ARTICLE_NUMBER = 1000;
const maxArticleLimitError = `Не больше ${MAX_ARTICLE_NUMBER} публикаций`;

const COMMAND = {
  HELP: `--help`,
  GENERATE: `--generate`,
  VERSION: `--version`,
};

const EXIT_CODE = {
  SUCCESS: 0,
  FAIL: 1,
};

const ANNOUNCE_SENTENCES_RANGE = {
  MIN: 1,
  MAX: 5,
};

const FULL_TEXT_SENTENCES_RANGE = {
  MIN: 1,
  MAX: 20,
};

const SERVICE_LOGGER_NAME = `service`;

const ENV = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  ENV,
  SERVICE_LOGGER_NAME,
  MS_IN_MONTH,
  COMMAND,
  EXIT_CODE,
  USER_ARGV_INDEX,
  ANNOUNCE_SENTENCES_RANGE,
  FULL_TEXT_SENTENCES_RANGE,
  ID_LENGTH,
  TIME_RANGE_IN_MONTHS,
  DEFAULT_ARTICLE_NUMBER,
  maxArticleLimitError,
};
