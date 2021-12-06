'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model {}

const define = (sequelize) => Article.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  announce: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fulltext: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: `created_at`,
  },
  picture: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  paranoid: true,
  modelName: `Article`,
  tableName: `articles`,
});

module.exports = define;
