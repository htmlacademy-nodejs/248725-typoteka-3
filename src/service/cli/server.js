'use strict';

const http = require(`http`);
const path = require(`path`);
const fsPromises = require(`fs`).promises;
const {print, sendResponse} = require(`../utils`);
const {HTTP_CODE} = require(`../constants`);

const DEFAULT_PORT = 3000;
const NOT_FOUND_TEXT = `Not found`;

const createArticlesHTMLList = (articles) => {
  const listContent = articles
    .map(({title}) => `<li>${title}</li>`)
    .join(``);

  return (
    `<ul>${listContent}</ul>`
  );
};

const onClientConnect = async (request, response) => {
  switch (request.url) {
    case `/`:
      const articlesPath = path.join(__dirname, `../../../mocks.json`);

      try {
        const articlesJSON = await fsPromises.readFile(articlesPath, `utf-8`);
        const htmlBody = createArticlesHTMLList(JSON.parse(articlesJSON));
        sendResponse(response, 200, htmlBody);
      } catch (e) {
        sendResponse(response, HTTP_CODE.NOT_FOUND, NOT_FOUND_TEXT);
      }
      break;
    default:
      sendResponse(response, HTTP_CODE.NOT_FOUND, NOT_FOUND_TEXT);
      break;
  }
};

const getServerListeningHandler = (port) => (err) => err ?
  print.error(`Ошибка при создании http-сервера.`, err) :
  print.info(`Принимаю подключения на ${port}`);

module.exports = {
  name: `--server`,
  run([portFromUser]) {
    const port = portFromUser || DEFAULT_PORT;
    const httpServer = http.createServer(onClientConnect);
    httpServer.listen(port, getServerListeningHandler(port));
  }
};
