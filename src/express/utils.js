'use strict';

const {format} = require(`date-fns`);

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
  // формат строки приходит в виде `2021-06-22 19:32:45`
  const isoDate = dateString.replace(` `, `T`);
  const date = new Date(isoDate);
  return format(date, `dd.MM.yyyy', 'HH:mm`);
};

module.exports = {
  markSearchingWord,
  createPaginationRange,
  transformDateToReadableFormat
};
