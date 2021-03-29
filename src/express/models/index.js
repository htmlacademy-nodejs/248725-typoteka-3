'use strict';

const {publications, notes} = require(`./my`);
const {categoryList} = require(`./categories`);
const {searchResultList} = require(`./search`);
const {
  articleData,
  categoryThemeList,
  categoryPreviewList
} = require(`./articles`);
const {
  themeList,
  hotList,
  lastCommentariesList,
  previewList,
} = require(`./main`);

module.exports = {
  publications,
  notes,
  categoryList,
  themeList,
  hotList,
  lastCommentariesList,
  previewList,
  searchResultList,
  articleData,
  categoryThemeList,
  categoryPreviewList,
};
