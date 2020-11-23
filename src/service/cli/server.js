'use strict';

const http = require(`http`);
const path = require(`path`);
const {StatusCodes, getReasonPhrase} = require(`http-status-codes`);
const fsPromises = require(`fs`).promises;
const {print, sendResponse} = require(`../utils`);

const DEFAULT_PORT = 3000;

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
        sendResponse(response, StatusCodes.OK, htmlBody);
      } catch (e) {
        sendResponse(response, StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
      }
      break;
    default:
      sendResponse(response, StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
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
