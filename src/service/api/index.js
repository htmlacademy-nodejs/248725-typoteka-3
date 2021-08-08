'use strict';

const {Router} = require(`express`);
const registerArticlesRoute = require(`./articles`);
const registerCategoriesRoute = require(`./categories`);
const registerSearchRoute = require(`./search`);
const {
  ArticlesService,
  CommentsService,
  CategoriesService,
  SearchService,
} = require(`../data-service`);
const {getMockData} = require(`../lib`);

module.exports = async () => {
  const app = new Router();
  const mockData = await getMockData();

  registerArticlesRoute(app, new ArticlesService(mockData), new CommentsService());
  registerCategoriesRoute(app, new CategoriesService(mockData));
  registerSearchRoute(app, new SearchService(mockData));

  return app;
};
