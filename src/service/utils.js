'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);
const util = require(`util`);
const {EXIT_CODE} = require(`./constants`);
const writeFile = util.promisify(fs.writeFile);

const print = {
  error: (text, customColor = `red`) => console.error(chalk[customColor](text)),
  success: (text, customColor = `green`) => console.info(chalk[customColor](text)),
  info: (text, customColor = `grey`) => console.info(chalk[customColor](text)),
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }
  return someArray;
};

const getRandomValueFromArray = (arr) => arr[getRandomInt(0, arr.length - 1)];

const getRandomSizedArray = (arr, minSize, maxSize) => {
  const size = getRandomInt(minSize, maxSize);
  return shuffle(arr).slice(0, size);
};

const breakProcessWithError = (errorText) => {
  print.error(errorText);
  process.exit(EXIT_CODE.FAIL);
};

const completeProcess = () => {
  process.exit(EXIT_CODE.SUCCESS);
};

const writeResultInFile = async (result, fileName) => {
  try {
    writeFile(fileName, result);
    print.success(`Запись в файл завершилась успешно`);
    completeProcess();
  } catch (e) {
    breakProcessWithError(`Ошибка записи в файл`);
  }
};

const normalizeDatetimeComponent = (val) => `${val}`.length < 2 ? `0${val}` : `${val}`;

const getDatetimeStr = (date) => {
  const year = date.getUTCFullYear();
  const month = normalizeDatetimeComponent(date.getUTCMonth() + 1);
  const day = normalizeDatetimeComponent(date.getUTCDate());
  const hours = normalizeDatetimeComponent(date.getUTCHours());
  const minutes = normalizeDatetimeComponent(date.getUTCMinutes());
  const seconds = normalizeDatetimeComponent(date.getUTCSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

module.exports = {
  print,
  getRandomInt,
  shuffle,
  getRandomValueFromArray,
  getRandomSizedArray,
  breakProcessWithError,
  completeProcess,
  writeResultInFile,
  getDatetimeStr,
};
