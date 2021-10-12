'use strict';

const path = require(`path`);

const dataPath = {
  titles: path.resolve(__dirname, `../../data/titles.txt`),
  categories: path.resolve(__dirname, `../../data/categories.txt`),
  sentences: path.resolve(__dirname, `../../data/sentences.txt`),
  comments: path.resolve(__dirname, `../../data/comments.txt`),
  emails: path.resolve(__dirname, `../../data/emails.txt`),
  passwordHashes: path.resolve(__dirname, `../../data/passwordHashes.txt`),
  userFirstNamesForMan: path.resolve(__dirname, `../../data/userFirstNamesForMan.txt`),
  userFirstNamesForWoman: path.resolve(__dirname, `../../data/userFirstNamesForWoman.txt`),
  userLastNames: path.resolve(__dirname, `../../data/userLastNames.txt`),
};

module.exports = dataPath;
