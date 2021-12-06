'use strict';

const alias = require(`../models/alias`);
const {Sequelize} = require(`sequelize`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
  }

  async findOne(id) {
    return this._Category.findByPk(id, {include: {
      association: alias.ARTICLES,
      include: [alias.CATEGORIES, alias.COMMENTS],
    }});
  }

  async findAll() {
    return await this._Category.findAll({raw: true});
  }

  async findWithCountNumber() {
    return await this._Category.findAll({
      attributes: [`name`, [Sequelize.fn(`COUNT`, Sequelize.col(`id`)), `number`]],
      raw: true,
      group: [`id`],
      order: [[Sequelize.col(`number`), `DESC`]],
      include: {
        association: alias.ARTICLE_CATEGORIES,
        attributes: [],
      }
    });
  }
}

module.exports = CategoryService;
