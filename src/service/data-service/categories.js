'use strict';

class CategoriesService {
  constructor(articles) {
    const categoriesReducer = (acc, item) => {
      item.category.forEach((category) => {
        const numberOfUsage = acc[category] || 0;
        acc[category] = numberOfUsage + 1;
      });
      return acc;
    };

    this._categories = articles.reduce(categoriesReducer, {});
  }

  findAll() {
    return Object.keys(this._categories);
  }

  findAllWithStats() {
    return this._categories;
  }
}

module.exports = CategoriesService;
