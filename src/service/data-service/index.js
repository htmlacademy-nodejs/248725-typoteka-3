'use strict';

const ArticlesService = require(`./articles`);
const CommentsService = require(`./comments`);
const CategoriesService = require(`./categories`);
const SearchService = require(`./search`);

module.exports = {
  ArticlesService,
  CommentsService,
  CategoriesService,
  SearchService,
};
