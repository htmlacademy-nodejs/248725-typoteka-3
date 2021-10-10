'use strict';

const {nanoid} = require(`nanoid`);
const {shuffle, getRandomInt, createDate} = require(`../utils`);

class CommentsCreationService {
  constructor({
    commentList,
    maxCommentsNumber
  }) {
    this.comments = new Array(getRandomInt(1, maxCommentsNumber))
      .fill(null)
      .map(() => this.createRandomComment(commentList));
  }

  createRandomComment(comments) {
    const COMMENT_ID_LENGTH = 6;
    const maxSize = comments.length;
    const commentsText = shuffle(comments).slice(0, getRandomInt(1, maxSize)).join(` `);
    return {
      createAt: createDate(),
      text: commentsText,
      id: nanoid(COMMENT_ID_LENGTH),
    };
  }
}

module.exports = CommentsCreationService;
