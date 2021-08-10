'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../constants`);

class CommentsService {
  create(article, articlesService, comment) {
    const newComment = Object.assign({id: nanoid(ID_LENGTH)}, comment);
    article.comments.push(newComment);
    articlesService.update(article.id, article);
    return newComment;
  }

  drop(article, articlesService, commentId) {
    const comment = article.comments.find((item) => item.id === commentId);

    if (!comment) {
      return null;
    }

    article.comments = article.comments.filter((item) => item.id !== commentId);
    articlesService.update(article.id, article);
    return comment;
  }

  findOne(article, commentId) {
    return article.comments.find((item) => item.id === commentId);
  }

  findAll(article) {
    return article.comments;
  }
}

module.exports = CommentsService;
