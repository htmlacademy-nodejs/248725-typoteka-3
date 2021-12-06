'use strict';

const {Router} = require(`express`);
const {serviceAPI} = require(`../api`);
const {transformDateToReadableFormat} = require(`../utils`);
const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articles = await serviceAPI.getArticles();
  const dataForRender = articles.map(({title, createdAt}) => ({
    content: title,
    datetime: {
      value: createdAt,
      readableValue: transformDateToReadableFormat(createdAt),
    }
  }));

  res.render(`my`, {
    notes: dataForRender,
  });
});

myRouter.get(`/comments`, async (req, res) => {
  const comments = await serviceAPI.getComments(1);
  console.log(comments);
  const dataForRender = comments.map((comment) => ({
    avatar: comment[`users.avatar`],
    author: comment[`users.name`],
    news: comment[`articles.title`],
    datetime: {
      value: comment.createdAt,
      readableValue: transformDateToReadableFormat(comment.createdAt),
    },
    comment: comment.text,
  }));

  res.render(`comments`, {
    publications: dataForRender,
  });
});

module.exports = myRouter;
