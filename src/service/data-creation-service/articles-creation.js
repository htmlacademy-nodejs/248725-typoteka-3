'use strict';

const {nanoid} = require(`nanoid`);
const {
  getRandomValueFromArray,
  getRandomSizedArray,
  createDate,
} = require(`../utils`);
const CommentsCreationService = require(`./comments-creation`);

class ArticlesCreationService {
  constructor({
    articlesNumberForCreation,
    titles,
    categories,
    sentences,
    comments,
  }) {
    const ARTICLE_ID_LENGTH = 6;

    this.articles = new Array(articlesNumberForCreation).fill(null).map(() => ({
      id: nanoid(ARTICLE_ID_LENGTH),
      title: this.createTitle(titles),
      announce: this.createAnnounce(sentences),
      fullText: this.createFullText(sentences),
      createdDate: createDate(),
      category: this.createCategory(categories),
      comments: this.createCommentaries(comments),
    }));
  }

  createTitle(titles) {
    return getRandomValueFromArray(titles);
  }

  createAnnounce(sentences) {
    const MIN_ANNOUNCE_SENTENCES_RANGE = 1;
    const MAX_ANNOUNCE_SENTENCES_RANGE = 5;
    return getRandomSizedArray(sentences, MIN_ANNOUNCE_SENTENCES_RANGE, MAX_ANNOUNCE_SENTENCES_RANGE);
  }

  createFullText(sentences) {
    const MIN_FULL_TEXT_SENTENCES_RANGE = 1;
    const MAX_FULL_TEXT_SENTENCES_RANGE = 20;
    return getRandomSizedArray(sentences, MIN_FULL_TEXT_SENTENCES_RANGE, MAX_FULL_TEXT_SENTENCES_RANGE);
  }

  createCategory(categories) {
    return getRandomSizedArray(categories, 0, categories.length - 1);
  }

  createCommentaries(commentList) {
    const {comments} = new CommentsCreationService({
      commentList,
      maxCommentsNumber: commentList.length
    });

    return comments;
  }
}

module.exports = ArticlesCreationService;
