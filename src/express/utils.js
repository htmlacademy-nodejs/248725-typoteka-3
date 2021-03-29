'use strict';

const createPaginationRange = (currentPage, lastPage) => {
  const PAGES_LIMIT = 5;
  const delta = Math.floor(PAGES_LIMIT / 2);

  if (currentPage <= PAGES_LIMIT - delta) {
    return new Array(PAGES_LIMIT).fill(null).map((_, index) => index + 1);
  }

  if (currentPage >= lastPage - delta) {
    return new Array(PAGES_LIMIT).fill(null).map((_, index) => lastPage - index).reverse();
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

module.exports = {
  markSearchingWord,
  createPaginationRange
};
