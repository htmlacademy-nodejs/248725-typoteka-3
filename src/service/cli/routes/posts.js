'use strict';

const path = require(`path`);
const {promises: fsPromises} = require(`fs`);
const {Router} = require(`express`);

const myRouter = new Router();
const DEFAULT_JSON_BODY = `[]`;

myRouter.get(`/`, async (req, res) => {
  const articlesPath = path.join(__dirname, `../../../../mocks.json`);
  try {
    const articles = await fsPromises.readFile(articlesPath, `utf-8`);
    res.json(JSON.parse(articles || DEFAULT_JSON_BODY));
  } catch (e) {
    res.json(JSON.parse(DEFAULT_JSON_BODY));
  }
});

module.exports = myRouter;
