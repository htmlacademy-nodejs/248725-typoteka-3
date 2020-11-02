'use strict';

const {print} = require(`../utils`);
const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    print.info(version, `blue`);
  }
};
