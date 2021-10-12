'use strict';

const {
  DEFAULT_ARTICLE_NUMBER,
  MAX_ARTICLE_NUMBER,
  maxArticleLimitError,
} = require(`../constants`);
const dataPath = require(`../dataPath`);
const {ArticlesCreationService, CategoriesCreationService} = require(`../data-creation-service`);
const {
  writeResultInFile,
  breakProcessWithError,
  readDataFromFile,
} = require(`../utils`);

module.exports = {
  name: `--generate`,
  async run([adsNumber]) {
    const FILE_NAME = `mocks.json`;
    const articlesNumberForCreation = Number(adsNumber) || DEFAULT_ARTICLE_NUMBER;

    if (articlesNumberForCreation > MAX_ARTICLE_NUMBER) {
      breakProcessWithError(maxArticleLimitError);
      return;
    }

    const [titleList, categoryList, sentenceList, commentList] = await Promise.all([
      readDataFromFile(dataPath.titles),
      readDataFromFile(dataPath.categories),
      readDataFromFile(dataPath.sentences),
      readDataFromFile(dataPath.comments)
    ]);

    const {categories} = new CategoriesCreationService({categoryList});

    const {articles} = new ArticlesCreationService({
      titles: titleList,
      categories,
      sentences: sentenceList,
      comments: commentList,
      articlesNumberForCreation,
    });

    const enhancedArticles = articles.map((article) => ({
      ...article,
      category: article.category.map(({name}) => name)
    }));

    writeResultInFile(JSON.stringify(enhancedArticles), FILE_NAME);
  }
};
