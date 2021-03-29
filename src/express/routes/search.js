'use strict';

const {searchResultList} = require(`../models`);
const {markSearchingWord} = require(`../utils`);
const {Router} = require(`express`);

const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => {
  const searchValue = `Путешествия`;

  res.render(`search`, {
    searchValue,
    resultList: searchResultList.map((searchResultItem) => ({
      ...searchResultItem,
      content: markSearchingWord(searchResultItem.content, searchValue)
    })),
  });
});

module.exports = searchRouter;
