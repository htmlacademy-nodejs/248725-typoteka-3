'use strict';

const express = require(`express`);
const articlesRouter = require(`./routes/articles`);
const loginRouter = require(`./routes/login`);
const categoriesRouter = require(`./routes/categories`);
const myRouter = require(`./routes/my`);
const registerRouter = require(`./routes/register`);
const searchRouter = require(`./routes/search`);

const app = express();
const port = 8000;

app.get(`/`, (req, res) => res.send(req.originalUrl));
app.use(`/articles`, articlesRouter);
app.use(`/login`, loginRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/my`, myRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

app.listen(port);
