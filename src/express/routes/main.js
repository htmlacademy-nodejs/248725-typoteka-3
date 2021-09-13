'use strict';

const {Router} = require(`express`);
const mainPageRouter = new Router();
const {createPaginationRange, transformDateToReadableFormat} = require(`../utils`);
const {serviceAPI} = require(`../api`);

const transformArticlesToPageView = (articles) => articles.map((article) => ({
  categories: article.category,
  commentNumber: article.comments.length,
  title: article.title,
  announce: article.announce.join(` `),
  datetime: {
    value: article.createdDate,
    readableValue: transformDateToReadableFormat(article.createdDate),
  }
}));

const transformCategoriesToPageView = (categories) => Object.keys(categories)
  .map((categoryName) => ({
    countNumber: categories[categoryName],
    name: categoryName,
  }));

const createHotList = (articles) => articles
  .map((article) => ({
    title: article.title,
    commentsNumber: article.comments.length,
  }))
  .sort((articleA, articleB) => articleB.commentsNumber - articleA.commentsNumber)
  .slice(0, 4);

const createLastCommentariesList = (articles) => articles[0].comments.map(({text}) => ({
  author: `Анна Артамонова`,
  img: `img/avatar-small-1.png`,
  linkText: text,
}));

mainPageRouter.get(`/`, async (req, res) => {
  const CURRENT_PAGE = 1;
  const PAGES_LIMIT = 5;
  const articles = await serviceAPI.getArticles();
  const categoriesWithStats = await serviceAPI.getCategoriesWithStats();

  const enhancedArticles = transformArticlesToPageView(articles);
  const enhancedCategoriesWithStats = transformCategoriesToPageView(categoriesWithStats);
  const hotList = createHotList(articles);
  const lastCommentariesList = createLastCommentariesList(articles);
  const lastPage = articles.length > 0 ? Math.ceil(articles.length / PAGES_LIMIT) : 1;
  const paginationRange = createPaginationRange(CURRENT_PAGE, PAGES_LIMIT, lastPage);

  res.render(`main`, {
    articles: enhancedArticles,
    themeList: enhancedCategoriesWithStats,
    hotList,
    lastCommentariesList,
    pagination: {
      current: CURRENT_PAGE,
      last: lastPage,
      range: paginationRange,
    }
  });
});

module.exports = mainPageRouter;
