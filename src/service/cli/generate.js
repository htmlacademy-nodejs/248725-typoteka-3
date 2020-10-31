'use strict';

const {
  TITLES,
  ANNOUNCE_SENTENCES_RANGE,
  FULL_TEXT_SENTENCES_RANGE,
  CATEGORIES,
  SENTENCES,
  MS_IN_MONTH,
} = require(`../constants`);

const {
  getRandomInt,
  getRandomValueFromArray,
  getRandomSizedArray,
  writeResultInFile,
  breakProcessWithError,
  getDatetimeStr,
} = require(`../utils`);

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

const createArticle = () => ({
  title: getRandomValueFromArray(TITLES),
  announce: getRandomSizedArray(SENTENCES, ANNOUNCE_SENTENCES_RANGE.MIN, ANNOUNCE_SENTENCES_RANGE.MAX),
  fullText: getRandomSizedArray(SENTENCES, FULL_TEXT_SENTENCES_RANGE.MIN, FULL_TEXT_SENTENCES_RANGE.MAX),
  createdDate: getArticleCreatedDate(),
  category: getRandomSizedArray(CATEGORIES, 0, CATEGORIES.length - 1),
});

module.exports = {
  name: `--generate`,
  run([adsNumber]) {
    const articlesNumberForCreation = Number(adsNumber) || DEFAULT_ARTICLE_NUMBER;

    if (articlesNumberForCreation > MAX_ARTICLE_NUMBER) {
      breakProcessWithError(MAX_ARTICLE_LIMIT_ERROR);
      return;
    }

    const articles = new Array(articlesNumberForCreation).fill(null).map(() => createArticle());
    writeResultInFile(JSON.stringify(articles), FILE_NAME);
  }
};
