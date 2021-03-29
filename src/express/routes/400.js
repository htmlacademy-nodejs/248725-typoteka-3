'use strict';

const {Router} = require(`express`);
const clientErrorPageRouter = new Router();

clientErrorPageRouter.get(`/`, (req, res) =>
  res.render(`400`));

module.exports = clientErrorPageRouter;
