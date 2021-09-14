'use strict';

const {Router} = require(`express`);
const {serviceAPI} = require(`../api`);
const {transformDateToReadableFormat} = require(`../utils`);
const myRouter = new Router();

const template = {
  avatar: `avatar-small-2.png`,
  author: `Александр Петров`,
  news: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты.`,
  datetime: {
    value: `2019-03-21T20:33`,
    readableValue: `21.03.2019, 20:33`,
  }
};

myRouter.get(`/`, async (req, res) => {
  const articles = await serviceAPI.getArticles();
  const dataForRender = articles.map(({title, createdDate}) => ({
    content: title,
    datetime: {
      value: createdDate,
      readableValue: transformDateToReadableFormat(createdDate),
    }
  }));

  res.render(`my`, {
    notes: dataForRender,
  });
});

myRouter.get(`/comments`, async (req, res) => {
  const comments = await serviceAPI.getComments(`4DpniN`);
  const dataForRender = comments.map(({text}) => ({
    ...template,
    comment: text,
  }));

  res.render(`comments`, {
    publications: dataForRender,
  });
});

module.exports = myRouter;
