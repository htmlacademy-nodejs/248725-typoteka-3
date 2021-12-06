'use strict';

const {Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineUser = require(`./user`);
const alias = require(`./alias`);

class ArticleCategory extends Model {}

const define = async (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const User = defineUser(sequelize);

  ArticleCategory.init({}, {
    sequelize,
    tableName: `article_categories`,
    modelName: `ArticleCategory`,
    timestamps: false,
    paranoid: true,
  });

  Article.hasMany(Comment, {as: alias.COMMENTS, foreignKey: `article_id`, onDelete: `cascade`});
  Comment.belongsTo(Article, {as: alias.ARTICLES, foreignKey: `article_id`});

  User.hasMany(Article, {as: alias.ARTICLES, foreignKey: `user_id`});
  Article.belongsTo(User, {as: alias.USERS, foreignKey: `user_id`});

  User.hasMany(Comment, {as: alias.COMMENTS, foreignKey: `user_id`});
  Comment.belongsTo(User, {as: alias.USERS, foreignKey: `user_id`});

  Article.belongsToMany(Category, {through: ArticleCategory, as: alias.CATEGORIES, foreignKey: `category_id`});
  Category.belongsToMany(Article, {through: ArticleCategory, as: alias.ARTICLES, foreignKey: `article_id`});

  Category.belongsTo(ArticleCategory, {as: alias.ARTICLE_CATEGORIES, foreignKey: `id`});
  ArticleCategory.hasMany(Category, {as: alias.CATEGORIES, foreignKey: `id`});

  return {
    Category,
    Article,
    Comment,
    User,
    ArticleCategory,
  };
};

module.exports = define;
