'use strict';

const {categoryList} = require(`../models`);
const {Router} = require(`express`);
const categoriesRouter = new Router();

categoriesRouter.get(`/`, (req, res) =>
  res.render(`all-categories`, {
    categoryList,
  }));

module.exports = categoriesRouter;
