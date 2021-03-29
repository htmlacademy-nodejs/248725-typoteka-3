'use strict';

const {
  articleData,
  categoryThemeList,
  categoryPreviewList
} = require(`../models`);
const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) =>
  res.render(`articles-by-category`, {
    selectedCategory: `Бизнес`,
    themeList: categoryThemeList,
    previewList: categoryPreviewList,
  }));

articlesRouter.get(`/add`, (req, res) =>
  res.render(`new-post`, {

  }));

articlesRouter.get(`/edit/:id`, (req, res) =>
  res.render(`post`, {
    ...articleData,
  }));

articlesRouter.get(`/:id`, (req, res) =>
  res.render(`post`, {
    ...articleData,
  }));

module.exports = articlesRouter;
