'use strict';

const {Router} = require(`express`);
const {StatusCodes} = require(`http-status-codes`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    const categories = await service.findAll();
    res.status(StatusCodes.OK).json(categories);
  });

  route.get(`/stats`, async (req, res) => {
    const categoriesWithStats = await service.findWithCountNumber();
    res.status(StatusCodes.OK).json(categoriesWithStats);
  });

  route.get(`/:categoryId`, async (req, res) => {
    const category = await service.findOne(req.params.categoryId);
    res.status(StatusCodes.OK).json(category);
  });
};
