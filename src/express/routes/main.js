'use strict';

const {Router} = require(`express`);
const mainPageRouter = new Router();
const {createPaginationRange, transformArticlesToPageView} = require(`../utils`);
const {serviceAPI} = require(`../api`);

const createHotList = (articles) => articles
  .map((article) => ({
    title: article.title,
    commentsNumber: article.comments.length,
  }))
  .sort((articleA, articleB) => articleB.commentsNumber - articleA.commentsNumber)
  .slice(0, 4);

mainPageRouter.get(`/`, async (req, res) => {
  const CURRENT_PAGE = 1;
  const PAGES_LIMIT = 5;
  const articles = await serviceAPI.getArticles();
  const categoriesWithStats = await serviceAPI.getCategoriesWithStats();
  const lastCommentariesList = await serviceAPI.getLastComments(3);
  const enhancedArticles = transformArticlesToPageView(articles);
  const hotList = createHotList(articles);
  const lastPage = articles.length > 0 ? Math.ceil(articles.length / PAGES_LIMIT) : 1;
  const paginationRange = createPaginationRange(CURRENT_PAGE, PAGES_LIMIT, lastPage);

  res.render(`main`, {
    articles: enhancedArticles,
    categoryList: categoriesWithStats,
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
