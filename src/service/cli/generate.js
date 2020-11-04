'use strict';

const path = require(`path`);
const {
  ANNOUNCE_SENTENCES_RANGE,
  FULL_TEXT_SENTENCES_RANGE,
  MS_IN_MONTH,
} = require(`../constants`);

const {
  getRandomInt,
  getRandomValueFromArray,
  getRandomSizedArray,
  writeResultInFile,
  breakProcessWithError,
  getDatetimeStr,
  readDataFromFile,
} = require(`../utils`);

const dataPath = {
  titles: path.resolve(__dirname, `../../../data/titles.txt`),
  categories: path.resolve(__dirname, `../../../data/categories.txt`),
  sentences: path.resolve(__dirname, `../../../data/sentences.txt`),
};
const DEFAULT_ARTICLE_NUMBER = 1;
const MAX_ARTICLE_NUMBER = 1000;
const MAX_ARTICLE_LIMIT_ERROR = `Не больше ${MAX_ARTICLE_NUMBER} публикаций`;
const FILE_NAME = `mocks.json`;
const TIME_RANGE_IN_MONTHS = 3;
const timeRangeInMs = MS_IN_MONTH * TIME_RANGE_IN_MONTHS;

const getArticleCreatedDate = () => {
  const endDate = Date.now();
  const startDate = endDate - timeRangeInMs;
  const createdDate = new Date(getRandomInt(startDate, endDate));
  return getDatetimeStr(createdDate);
};

module.exports = {
  name: `--generate`,
  async run([adsNumber]) {
    const articlesNumberForCreation = Number(adsNumber) || DEFAULT_ARTICLE_NUMBER;

    if (articlesNumberForCreation > MAX_ARTICLE_NUMBER) {
      breakProcessWithError(MAX_ARTICLE_LIMIT_ERROR);
      return;
    }

    const [titles, categories, sentences] = await Promise.all([
      readDataFromFile(dataPath.titles),
      readDataFromFile(dataPath.categories),
      readDataFromFile(dataPath.sentences)
    ]);

    const articles = new Array(articlesNumberForCreation).fill(null).map(() => ({
      title: getRandomValueFromArray(titles),
      announce: getRandomSizedArray(sentences, ANNOUNCE_SENTENCES_RANGE.MIN, ANNOUNCE_SENTENCES_RANGE.MAX),
      fullText: getRandomSizedArray(sentences, FULL_TEXT_SENTENCES_RANGE.MIN, FULL_TEXT_SENTENCES_RANGE.MAX),
      createdDate: getArticleCreatedDate(),
      category: getRandomSizedArray(categories, 0, categories.length - 1),
    }));

    writeResultInFile(JSON.stringify(articles), FILE_NAME);
  }
};
