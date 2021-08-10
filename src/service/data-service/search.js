'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(searchStr) {
    const lowerCasedSearchStr = searchStr.toLowerCase();
    return this._articles.filter((item) => {
      const lowerCasedTitle = item.title.toLowerCase();
      return lowerCasedTitle.includes(lowerCasedSearchStr);
    });
  }
}

module.exports = SearchService;
