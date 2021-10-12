'use strict';

class CategoriesCreationService {
  constructor({categoryList}) {
    this.categories = categoryList.map((category, index) => {
      return ({
        id: index + 1,
        name: category,
      });
    });
  }
}

module.exports = CategoriesCreationService;
