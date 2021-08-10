'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../constants`);

class ArticlesService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object
      .assign({id: nanoid(ID_LENGTH), comments: []}, article);

    this._articles.push(newArticle);
    return newArticle;
  }


  update(id, article) {
    const oldArticle = this._articles
      .find((item) => item.id === id);

    if (!oldArticle) {
      return null;
    }

    const newArticle = Object.assign(oldArticle, article);

    this._articles = this._articles.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return newArticle;
    });

    return newArticle;
  }

  drop(id) {
    const article = this._articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }
}

module.exports = ArticlesService;
