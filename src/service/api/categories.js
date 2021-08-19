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
};
