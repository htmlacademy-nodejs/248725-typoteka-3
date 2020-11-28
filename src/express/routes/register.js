'use strict';

const {Router} = require(`express`);
const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => res.send(req.originalUrl));

module.exports = registerRouter;
