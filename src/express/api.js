'use strict';

const axios = require(`axios`);

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  getComments(id) {
    return this._load(`/articles/${id}/comments`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  getCategories() {
    return this._load(`/categories`);
  }

  getCategoriesWithStats() {
    return this._load(`/categories/stats`);
  }

  createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
  }

  findArticles(searchStr) {
    return this._load(`/search?query=${encodeURI(searchStr)}`);
  }
}

const TIMEOUT = 1000;
const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;
const serviceAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  serviceAPI,
};
