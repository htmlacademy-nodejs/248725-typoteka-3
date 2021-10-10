'use strict';

const ArticlesCreationService = require(`./articles-creation`);
const UsersCreationService = require(`./users-creation`);
const CommentsCreationService = require(`./comments-creation`);
const CategoriesCreationService = require(`./categories-creation`);

module.exports = {
  ArticlesCreationService,
  UsersCreationService,
  CategoriesCreationService,
  CommentsCreationService,
};
