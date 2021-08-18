'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {StatusCodes} = require(`http-status-codes`);
const {describe, test, expect} = require(`@jest/globals`);
const registerCategoriesRoute = require(`./categories`);
const DataService = require(`../data-service/categories`);
const mockData = require(`../../../mockDataForTest`);

const CATEGORIES_ROUTE = `/categories`;
const app = express();
app.use(express.json());
registerCategoriesRoute(app, new DataService(mockData));

describe(`API returns categories`, () => {
  const categories = [
    `Архитектура`,
    `Музыка`,
    `Шапито`,
    `Железо`,
    `IT`,
    `Программирование`,
    `Разное`,
    `Без рамки`,
    `Живопись`,
    `За жизнь`,
    `Кино`,
    `Деревья`
  ];

  test(`Should has "200 OK" status`, async () => {
    const response = await request(app)
      .get(CATEGORIES_ROUTE);

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  test(`Should return categories`, async () => {
    const response = await request(app)
      .get(CATEGORIES_ROUTE);

    expect(response.body).toStrictEqual(categories);
  });
});
