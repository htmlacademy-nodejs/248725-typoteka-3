'use strict';

const {markSearchingWord, transformDateToReadableFormat} = require(`../utils`);
const {Router} = require(`express`);
const {serviceAPI} = require(`../api`);
const multer = require(`multer`);
const upload = multer();

const searchRouter = new Router();

const transformSearchResultForPageView = (article) => ({
  datetime: {
    value: article.createdDate,
    readableValue: transformDateToReadableFormat(article.createdDate),
  },
  content: article.title,
});

searchRouter.get(`/`, async (req, res) => {
  const searchResult = await serviceAPI.findArticles(``);

  res.render(`search`, {
    searchValue: ``,
    resultList: searchResult.map(transformSearchResultForPageView)
  });
});

searchRouter.post(`/`, upload.none(), async (req, res) => {
  const MAX_SEARCH_LIMIT = 4;
  const searchValue = req.body.search;
  const searchResultFromService = await serviceAPI.findArticles(searchValue);

  const searchResultForPage = searchResultFromService
    .slice(0, MAX_SEARCH_LIMIT)
    .map(transformSearchResultForPageView)
    .map((searchResultItem) => ({
      ...searchResultItem,
      content: markSearchingWord(searchResultItem.content, searchValue)
    }));

  res.render(`search`, {
    searchValue,
    resultList: searchResultForPage,
  });
});

module.exports = searchRouter;
