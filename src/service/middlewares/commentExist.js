'use strict';

const {StatusCodes} = require(`http-status-codes`);

module.exports = (articlesService, commentsService) => (req, res, next) => {
  const {articleId, commentId} = req.params;
  const article = articlesService.findOne(articleId);
  const comment = commentsService.findOne(article, commentId);

  if (!comment) {
    return res.status(StatusCodes.NOT_FOUND)
      .send(`Comment with ${commentId} not found`);
  }

  return next();
};
