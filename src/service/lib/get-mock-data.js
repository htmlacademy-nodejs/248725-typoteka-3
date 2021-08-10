'use strict';

const {promises: fsPromises} = require(`fs`);
const path = require(`path`);
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
    console.error(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
