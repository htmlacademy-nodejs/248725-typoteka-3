'use strict';

const {Op} = require(`sequelize`);
const alias = require(`../models/alias`);

class SearchService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async findAll(searchText) {
    const articles = await this._Article.findAll({
      where: {
        title: {
          [Op.substring]: searchText
        }
      },
      include: [alias.CATEGORIES, alias.COMMENTS],
      order: [
        [`createdAt`, `DESC`]
      ]
    });
    return articles.map((offer) => offer.get());
  }
}

module.exports = SearchService;
