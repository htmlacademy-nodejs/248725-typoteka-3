'use strict';

const {format, parseISO} = require(`date-fns`);

const createPaginationRange = (currentPage, pagesLimit, lastPage) => {
  const delta = Math.floor(pagesLimit / 2);

  if (currentPage <= pagesLimit - delta) {
    return new Array(pagesLimit).fill(null).map((_, index) => index + 1);
  }

  if (currentPage >= lastPage - delta) {
    return new Array(pagesLimit).fill(null).map((_, index) => lastPage - index).reverse();
  }

  const result = [];

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    result.push(i);
  }

  return result;
};

const markSearchingWord = (text, word) => {
  const searchWord = new RegExp(word, `i`);
  return text.replace(searchWord, (match) => `<b>${match}</b>`);
};

const transformDateToReadableFormat = (dateString) => {
  const date = parseISO(dateString);
  return format(date, `dd.MM.yyyy', 'HH:mm`);
};

const transformArticlesToPageView = (articles) => articles.map((article) => ({
  categories: article.categories,
  commentNumber: article.comments.length,
  title: article.title,
  announce: article.announce,
  picture: article.picture,
  datetime: {
    value: article.createdAt,
    readableValue: transformDateToReadableFormat(article.createdAt),
  }
}));

module.exports = {
  transformArticlesToPageView,
  markSearchingWord,
  createPaginationRange,
  transformDateToReadableFormat
};
