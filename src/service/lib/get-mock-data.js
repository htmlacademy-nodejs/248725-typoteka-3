'use strict';

const {promises: fsPromises} = require(`fs`);
const path = require(`path`);
const {getLogger} = require(`./logger`);
const {SERVICE_LOGGER_NAME} = require(`../constants`);
const logger = getLogger({name: SERVICE_LOGGER_NAME});
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const mockPath = path.join(__dirname, `../../../mocks.json`);
    const fileContent = await fsPromises.readFile(mockPath);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(`An error occurred while trying to read mock data file: ${err.message}`);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
