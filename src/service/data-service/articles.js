'use strict';

const alias = require(`../models/alias`);

class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async create(articleData) {
    const offer = await this._Article.create(articleData);
    await offer.addCategories(articleData.categories);
    return offer.get();
  }

  async update(id, article) {
    const [affectedRows] = await this._Article.update(article, {
      where: {id}
    });
    return !!affectedRows;
  }

  async drop(id) {
    const deletedRows = await this._Offer.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  findOne(id) {
    return this._Article.findByPk(id, {include: [alias.CATEGORIES, alias.COMMENTS]});
  }

  async findAll(needComments) {
    const include = [alias.CATEGORIES];

    if (needComments) {
      include.push(alias.COMMENTS);
    }

    const articles = await this._Article.findAll({include});

    return articles.map((item) => item.get());
  }
}

module.exports = ArticleService;
