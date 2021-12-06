'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();
const {serviceAPI} = require(`../api`);

categoriesRouter.get(`/`, async (req, res) => {
  const categories = await serviceAPI.getCategories();
  res.render(`all-categories`, {
    categoryList: categories,
  });
});

module.exports = categoriesRouter;
