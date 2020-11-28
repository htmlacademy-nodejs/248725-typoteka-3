'use strict';

const {Router} = require(`express`);
const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => res.send(req.originalUrl));

module.exports = loginRouter;
