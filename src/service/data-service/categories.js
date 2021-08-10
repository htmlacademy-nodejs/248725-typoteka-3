'use strict';

class CategoriesService {
  constructor(articles) {
    this._categories = articles.reduce((acc, item) => {
      item.category.forEach((category) => acc.add(category));
      return acc;
    }, new Set());
  }

  findAll() {
    return Array.from(this._categories);
  }
}

module.exports = CategoriesService;
