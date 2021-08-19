'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {StatusCodes} = require(`http-status-codes`);
const {describe, test, expect} = require(`@jest/globals`);
const registerArticlesRoute = require(`./articles`);
const ArticlesDataService = require(`../data-service/articles`);
const CommentsDataService = require(`../data-service/comments`);
const mockData = require(`../../../mockDataForTest`);

const ARTICLES_ROUTE_PART = `/articles`;
const NON_EXISTENT_ID = `RANDOM`;
const newComment = {
  text: `wow, new comment`
};
const newArticle = {
  title: `Обзор новейшего смартфона`,
  announce: [
    `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  ],
  fullText: [
    `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  ],
  createdDate: `2021-06-22 19:32:45`,
  category: [`Архитектура`, `Музыка`],
};

const getArticlesRoute = (articleId) => articleId
  ? `${ARTICLES_ROUTE_PART}/${articleId}`
  : `${ARTICLES_ROUTE_PART}`;

const getCommentsRoute = (articleId, commentId) => commentId
  ? `${ARTICLES_ROUTE_PART}/${articleId}/comments/${commentId}`
  : `${ARTICLES_ROUTE_PART}/${articleId}/comments`;

const app = express();
app.use(express.json());
registerArticlesRoute(app, new ArticlesDataService(mockData), new CommentsDataService());

// tests for articles
describe(`API returns articles`, () => {
  /** Article(s) getting **/
  test(`Should has "200 OK" status (getting articles)`, async () => {
    const response = await request(app)
      .get(getArticlesRoute());

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  test(`Should has correct article list`, async () => {
    const response = await request(app)
      .get(getArticlesRoute());

    expect(response.body).toStrictEqual(mockData);
  });

  test(`Should has correct article by id param`, async () => {
    const articleIdFromMockData = `4DpniN`;

    const response = await request(app)
      .get(getArticlesRoute(articleIdFromMockData));

    expect(response.body.id).toBe(articleIdFromMockData);
  });

  test(`Should has "404 NOT FOUND" status when article id wouldn't exist`, async () => {
    const response = await request(app)
      .get(getArticlesRoute(NON_EXISTENT_ID));

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  /** Article creating **/
  test(`Should has "201 CREATED" status (article creating)`, async () => {
    const response = await request(app)
      .post(getArticlesRoute())
      .set(`Content-Type`, `application/json`)
      .send(newArticle);

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });

  test(`Should create article with same data that was passed in body`, async () => {
    const response = await request(app)
      .post(getArticlesRoute())
      .set(`Content-Type`, `application/json`)
      .send(newArticle);

    expect(response.body).toMatchObject(newArticle);
  });

  test(`Should has "400 BAD REQUEST" status when body wouldn't have required fields (article creating)`, async () => {
    const response = await request(app)
      .post(getArticlesRoute())
      .set(`Content-Type`, `application/json`)
      .send({});

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  /** Article editing **/
  test(`Should change article with same data that was passed in body`, async () => {
    const articleIdFromMockData = `d26rsb`;

    const response = await request(app)
      .put(getArticlesRoute(articleIdFromMockData))
      .set(`Content-Type`, `application/json`)
      .send(newArticle);

    expect(response.body).toMatchObject(newArticle);
  });

  test(`Should has "400 BAD REQUEST" status when body wouldn't have required fields (article editing)`, async () => {
    const articleIdFromMockData = `d26rsb`;

    const response = await request(app)
      .put(getArticlesRoute(articleIdFromMockData))
      .set(`Content-Type`, `application/json`)
      .send({});

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  /** Article removing **/
  test(`Should has "200 OK" status (article removing)`, async () => {
    const articleIdFromMockData = `X_KL3e`;

    const response = await request(app)
      .delete(getArticlesRoute(articleIdFromMockData));

    expect(response.body.id).toBe(articleIdFromMockData);
  });

  test(`Should has "404 NOT FOUND" status when removing article id wouldn't exist`, async () => {
    const response = await request(app)
      .delete(getArticlesRoute(NON_EXISTENT_ID));

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  test(`Should remove article with same id that was passed in request`, async () => {
    const articleIdFromMockData = `4DpniN`;

    const response = await request(app)
      .delete(getArticlesRoute(articleIdFromMockData));

    expect(response.body.id).toBe(articleIdFromMockData);
  });
});

// tests for comments
describe(`API returns comments from article`, () => {
  /** Comments editing **/
  test(`Should has "200 OK" status (getting comments)`, async () => {
    const articleIdFromMockData = `d26rsb`;

    const response = await request(app)
      .get(getCommentsRoute(articleIdFromMockData));

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  test(`Should has "404 NOT FOUND" status when article id wouldn't exist`, async () => {
    const response = await request(app)
      .get(getCommentsRoute(NON_EXISTENT_ID));

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  test(`Should has correct comment list`, async () => {
    const getCommentIdList = (comments) => comments.map((comment) => comment.id);
    const articleIdFromMockData = `d26rsb`;
    const expectedIdList = [
      `XduEo5`,
      `lL3L3y`,
      `smsB9v`,
      `e3a8B0`,
      `bICKR1`,
      `ruPBd1`,
      `sy72LJ`,
      `W8EIUm`,
      `fOgszg`,
    ];

    const response = await request(app)
      .get(getCommentsRoute(articleIdFromMockData));

    expect(getCommentIdList(response.body)).toStrictEqual(expectedIdList);
  });

  /** Comment creating **/
  test(`Should has "201 CREATED" status (comment creating)`, async () => {
    const articleIdFromMockData = `d26rsb`;

    const response = await request(app)
      .post(getCommentsRoute(articleIdFromMockData))
      .set(`Content-Type`, `application/json`)
      .send(newComment);

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });

  test(`Should create comment with same data that was passed in body`, async () => {
    const articleIdFromMockData = `d26rsb`;

    const response = await request(app)
      .post(getCommentsRoute(articleIdFromMockData))
      .set(`Content-Type`, `application/json`)
      .send(newComment);

    expect(response.body).toMatchObject(newComment);
  });

  test(`Should has "400 BAD REQUEST" status when body wouldn't have required fields`, async () => {
    const articleIdFromMockData = `d26rsb`;

    const response = await request(app)
      .post(getCommentsRoute(articleIdFromMockData))
      .set(`Content-Type`, `application/json`)
      .send({});

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  /** Comment removing **/
  test(`Should has "200 OK" status (comment removing)`, async () => {
    const articleIdFromMockData = `d26rsb`;
    const commentIdFromMockData = `XduEo5`;

    const response = await request(app)
      .delete(getCommentsRoute(articleIdFromMockData, commentIdFromMockData));

    expect(response.body.id).toBe(commentIdFromMockData);
  });

  test(`Should has "404 NOT FOUND" status when removing comment id wouldn't exist`, async () => {
    const articleIdFromMockData = `d26rsb`;

    const response = await request(app)
      .delete(getCommentsRoute(articleIdFromMockData, NON_EXISTENT_ID));

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  test(`Should remove comment with same id that was passed in request`, async () => {
    const articleIdFromMockData = `d26rsb`;
    const commentIdFromMockData = `lL3L3y`;

    const response = await request(app)
      .delete(getCommentsRoute(articleIdFromMockData, commentIdFromMockData));

    expect(response.body.id).toBe(commentIdFromMockData);
  });
});
