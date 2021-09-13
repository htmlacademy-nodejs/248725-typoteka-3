'use strict';

const {
  articleData,
  categoryThemeList,
  categoryPreviewList
} = require(`../models`);
const multer = require(`multer`);
const {Router} = require(`express`);
const {serviceAPI} = require(`../api`);
const storage = require(`../storage`);
const {format} = require(`date-fns`);

const articlesRouter = new Router();
const upload = multer({storage});

articlesRouter.get(`/category/:id`, (req, res) =>
  res.render(`articles-by-category`, {
    selectedCategory: `Бизнес`,
    themeList: categoryThemeList,
    previewList: categoryPreviewList,
  }));

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
      photo: req.file.filename,
      title: req.body.title,
      category: [],
      fullText: req.body[`full-text`].split(`.`),
      announce: req.body.announcement.split(`.`),
      createdDate: req.body.date,
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
    announcement: article.announce.join(` `),
    fullText: article.fullText.join(` `),
    categories: article.category,
    createdDate: article.createdDate,
  });
});

articlesRouter.get(`/:id`, (req, res) =>
  res.render(`post`, {
    ...articleData,
  }));

module.exports = articlesRouter;
