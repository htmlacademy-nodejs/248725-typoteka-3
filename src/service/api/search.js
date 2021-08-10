'use strict';

const {Router} = require(`express`);
const {StatusCodes} = require(`http-status-codes`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, async (req, res) => {
    const {query: searchString} = req.query;
    const articles = await service.findAll(searchString);
    res.status(StatusCodes.OK).json(articles);
  });
};
