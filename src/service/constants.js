'use strict';

const USER_ARGV_INDEX = 2;

const MS_IN_MONTH = 2629746000;

const COMMAND = {
  HELP: `--help`,
  GENERATE: `--generate`,
  VERSION: `--version`,
};

const EXIT_CODE = {
  SUCCESS: 0,
  FAIL: 1,
};

const COLOR = {
  RED: `red`,
  GREEN: `green`,
  GREY: `grey`,
  BLUE: `blue`,
};

const ANNOUNCE_SENTENCES_RANGE = {
  MIN: 1,
  MAX: 5,
};

const FULL_TEXT_SENTENCES_RANGE = {
  MIN: 1,
  MAX: 20,
};

module.exports = {
  COLOR,
  MS_IN_MONTH,
  COMMAND,
  EXIT_CODE,
  USER_ARGV_INDEX,
  ANNOUNCE_SENTENCES_RANGE,
  FULL_TEXT_SENTENCES_RANGE,
};
