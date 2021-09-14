'use strict';

const express = require(`express`);
const path = require(`path`);
const articlesRouter = require(`./routes/articles`);
const loginRouter = require(`./routes/login`);
const categoriesRouter = require(`./routes/categories`);
const myRouter = require(`./routes/my`);
const registerRouter = require(`./routes/register`);
const searchRouter = require(`./routes/search`);
const clientErrorPageRouter = require(`./routes/400`);
const serverErrorPageRouter = require(`./routes/500`);
const mainPageRouter = require(`./routes/main`);

const app = express();
const port = 8000;

const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));
app.set(`views`, path.resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.get(`/`, mainPageRouter);
app.use(`/articles`, articlesRouter);
app.use(`/login`, loginRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/my`, myRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);
app.use(`/404`, clientErrorPageRouter);
app.use(`/500`, serverErrorPageRouter);

app.listen(port);
