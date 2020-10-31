'use strict';

const fs = require(`fs`);
const path = require(`path`);

const guidePath = path.resolve(__dirname, `../cli-guide.md`);
const guide = fs.readFileSync(guidePath, `utf-8`);

module.exports = {
  name: `--help`,
  run() {
    console.info(guide);
  }
};
