'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Comment extends Model {}

const define = (sequelize) => Comment.init({
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: `created_at`,
  },
}, {
  sequelize,
  timestamps: false,
  paranoid: true,
  modelName: `Comment`,
  tableName: `comments`
});

module.exports = define;
