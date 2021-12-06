'use strict';

const {Router} = require(`express`);
const {StatusCodes} = require(`http-status-codes`);
const {entityValidator, articleExist, commentExist} = require(`../middlewares`);

const route = new Router();

const ARTICLE_KEYS = [`category`, `fulltext`, `announce`, `title`, `createdAt`];
const COMMENT_KEYS = [`text`];

module.exports = (app, articlesService, commentsService) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await articlesService.findAll(true);
    res.status(StatusCodes.OK).json(articles);
  });

  route.post(`/`, entityValidator(ARTICLE_KEYS), async (req, res) => {
    const newArticle = await articlesService.create(req.body);
    res.status(StatusCodes.CREATED).json(newArticle);
  });

  route.get(`/:articleId`, articleExist(articlesService), async (req, res) => {
    const articleId = req.params.articleId;
    const article = await articlesService.findOne(articleId);
    res.status(StatusCodes.OK).json(article);
  });

  route.put(`/:articleId`, [articleExist(articlesService), entityValidator(ARTICLE_KEYS)], async (req, res) => {
    const articleId = req.params.articleId;
    const article = await articlesService.update(articleId, req.body);
    res.status(StatusCodes.OK).json(article);
  });

  route.delete(`/:articleId`, articleExist(articlesService), async (req, res) => {
    const article = await articlesService.drop(req.params.articleId);
    res.status(StatusCodes.OK).json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articlesService), async (req, res) => {
    const comments = await commentsService.findAll(req.params.articleId);
    res.status(StatusCodes.OK).json(comments);
  });

  route.post(`/:articleId/comments`, [articleExist(articlesService), entityValidator(COMMENT_KEYS)], async (req, res) => {
    const {article} = res.locals;
    const newComment = await commentsService.create(article, articlesService, req.body);
    res.status(StatusCodes.CREATED).json(newComment);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articlesService), commentExist(articlesService, commentsService)], async (req, res) => {
    const {article} = res.locals;
    const comment = await commentsService.drop(article, articlesService, req.params.commentId);
    res.status(StatusCodes.OK).json(comment);
  });
};
