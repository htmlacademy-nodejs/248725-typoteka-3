'use strict';

const multer = require(`multer`);
const {Router} = require(`express`);
const {serviceAPI} = require(`../api`);
const storage = require(`../storage`);
const {format} = require(`date-fns`);
const {transformArticlesToPageView} = require(`../utils`);

const articlesRouter = new Router();
const upload = multer({storage});

articlesRouter.get(`/category/:id`, async (req, res) => {
  const categoryList = await serviceAPI.getCategories();
  const category = await serviceAPI.getCategory(req.params.id);
  res.render(`articles-by-category`, {
    selectedCategory: category.title,
    categoryList,
    articles: transformArticlesToPageView(category.articles),
  });
});

articlesRouter.get(`/add`, (req, res) =>
  res.render(`new-post`, {
    title: ``,
    announcement: ``,
    fullText: ``,
    categories: [],
    createdDate: format(new Date(), `yyyy-MM-dd`),
  }));

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  try {
    await serviceAPI.createArticle({
      "picture": req.file.filename,
      "title": req.body.title,
      "category": [],
      "fulltext": req.body[`full-text`],
      "announce": req.body.announcement,
      "createdAt": req.body.date,
      "user_id": 1,
    });

    res.redirect(`/my`);
  } catch (e) {
    res.render(`new-post`, {
      title: req.body.title,
      announcement: req.body.announcement,
      fullText: req.body[`full-text`],
      categories: [],
      createdDate: req.body.date,
    });
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const article = await serviceAPI.getArticle(req.params.id);

  res.render(`new-post`, {
    title: article.title,
    announcement: article.announce,
    fullText: article.fulltext,
    categories: article.categories,
    createdDate: article.createdAt,
  });
});

articlesRouter.get(`/:id`, async (req, res) => {
  const article = await serviceAPI.getArticle(req.params.id);

  res.render(`post`, {
    title: article.title,
    announcement: article.announce,
    fullText: article.fulltext,
    categories: article.categories,
    createdDate: article.createdAt,
    comments: article.comments
  });
});

module.exports = articlesRouter;
