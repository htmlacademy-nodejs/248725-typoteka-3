'use strict';

const alias = require(`../models/alias`);
const {Sequelize} = require(`sequelize`);

class CommentService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
  }

  async create(articleId, comment) {
    return this._Comment.create({
      articleId,
      ...comment
    });
  }

  async drop(id) {
    const deletedRows = this._Comment.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  findAll(articleId) {
    return this._Comment.findAll({
      where: {'article_id': articleId},
      include: [
        {
          association: alias.USERS,
          attributes: [
            [Sequelize.fn(`CONCAT`, Sequelize.col(`last_name`), ` `, Sequelize.col(`first_name`)), `name`],
            `avatar`
          ],
        },
        {
          association: alias.ARTICLES,
          attributes: [`title`],
        },
      ],
      raw: true
    });
  }

  findLast(limit) {
    return this._Comment.findAll({
      raw: true,
      limit,
      order: [[`createdAt`, `DESC`]],
      include: {
        association: alias.USERS,
        attributes: [
          [Sequelize.fn(`CONCAT`, this.sequelize.col(`last_name`), ` `, Sequelize.col(`first_name`)), `name`],
          `avatar`
        ],
      }
    });
  }

  findOne(articleId, commentId) {
    return this._Comment.findAll({
      where: {articleId, id: commentId},
      raw: true
    });
  }
}

module.exports = CommentService;
