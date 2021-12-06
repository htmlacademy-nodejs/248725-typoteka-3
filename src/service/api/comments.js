'use strict';

const {Router} = require(`express`);
const {StatusCodes} = require(`http-status-codes`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/comments`, route);

  route.get(`/last`, async (req, res) => {
    const {limit} = req.query;
    const comments = await service.findLast(limit);
    res.status(StatusCodes.CREATED).json(comments);
  });
};
