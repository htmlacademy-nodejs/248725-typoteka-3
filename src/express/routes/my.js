'use strict';

const {notes, publications} = require(`../models`);
const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) =>
  res.render(`my`, {
    notes,
  }));

myRouter.get(`/comments`, (req, res) =>
  res.render(`comments`, {
    publications,
  }));

module.exports = myRouter;
