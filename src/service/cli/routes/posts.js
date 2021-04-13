'use strict';

const path = require(`path`);
const fs = require(`fs`);
const {promises: fsPromises} = fs;
const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articlesPath = path.join(__dirname, `../../../../mocks.json`);
  const DEFAULT_JSON_BODY = `[]`;
  const articles = fs.existsSync(articlesPath) ? await fsPromises.readFile(articlesPath, `utf-8`) : DEFAULT_JSON_BODY;
  res.json(JSON.parse(articles || DEFAULT_JSON_BODY));
});

module.exports = myRouter;
