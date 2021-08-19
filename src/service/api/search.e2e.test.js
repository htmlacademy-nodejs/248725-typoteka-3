'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {StatusCodes} = require(`http-status-codes`);
const {describe, test, expect} = require(`@jest/globals`);
const search = require(`./search`);
const DataService = require(`../data-service/search`);
const mockData = require(`../../../mockDataForTest`);

const SEARCH_ROUTE = `/search`;
const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns articles based on search query`, () => {
  test(`Should has "200 OK" status`, async () => {
    const response = await request(app)
      .get(SEARCH_ROUTE)
      .query({
        query: `Обзор`
      });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  test(`Should return articles if found something`, async () => {
    const response = await request(app)
      .get(SEARCH_ROUTE)
      .query({
        query: `Обзор`
      });

    expect(response.body.length).toBe(1);
  });

  test(`Should return correct articles`, async () => {
    const response = await request(app)
      .get(SEARCH_ROUTE)
      .query({
        query: `Обзор`
      });

    expect(response.body[0].id).toBe(mockData[0].id);
  });

  test(`Should return all articles if search string is empty`, async () => {
    const response = await request(app)
      .get(SEARCH_ROUTE)
      .query({
        query: ``
      });

    expect(response.body.length).toBe(mockData.length);
  });
});
