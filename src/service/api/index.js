'use strict';

const {Router} = require(`express`);
const registerArticlesRoute = require(`./articles`);
const registerCategoriesRoute = require(`./categories`);
const registerCommentsRoute = require(`./comments`);
const registerSearchRoute = require(`./search`);
const sequelize = require(`../lib/sequelize`);
const define = require(`../models`);
const {
  ArticlesService,
  CommentsService,
  CategoriesService,
  SearchService,
} = require(`../data-service`);

module.exports = async () => {
  const app = new Router();
  define(sequelize);

  registerArticlesRoute(app, new ArticlesService(sequelize), new CommentsService(sequelize));
  registerCategoriesRoute(app, new CategoriesService(sequelize));
  registerSearchRoute(app, new SearchService(sequelize));
  registerCommentsRoute(app, new CommentsService(sequelize));

  return app;
};
