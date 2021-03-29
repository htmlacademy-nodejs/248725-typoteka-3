'use strict';

const {Router} = require(`express`);
const serverErrorPageRouter = new Router();

serverErrorPageRouter.get(`/`, (req, res) =>
  res.render(`500`));

module.exports = serverErrorPageRouter;
