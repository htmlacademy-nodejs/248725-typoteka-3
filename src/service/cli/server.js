'use strict';

const express = require(`express`);
const postsRouter = require(`./routes/posts`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  async run([portFromUser]) {
    const app = express();
    app.use(express.json());
    app.use(`/posts`, postsRouter);
    app.listen(portFromUser || DEFAULT_PORT);
  }
};
