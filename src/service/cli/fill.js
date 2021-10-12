'use strict';

const dataPath = require(`../dataPath`);
const {
  ArticlesCreationService,
  UsersCreationService,
  CategoriesCreationService
} = require(`../data-creation-service`);
const {
  writeResultInFile,
  breakProcessWithError,
  readDataFromFile,
  shuffle,
  createDate,
  getRandomInt,
} = require(`../utils`);
const {
  DEFAULT_ARTICLE_NUMBER,
  MAX_ARTICLE_NUMBER,
  maxArticleLimitError,
} = require(`../constants`);

const createAvatarList = (avatarsNumber) =>
  shuffle(
      new Array(avatarsNumber)
        .fill(null)
        .map((_val, index) => `user-${index + 1}.jpg`)
  );

const createCommentListFromArticles = (articles, usersNumber) => articles
  .reduce((acc, {comments}, articleIndex) => [
    ...acc,
    ...comments.map((comment) => ({
      articleId: articleIndex + 1,
      userId: getRandomInt(1, usersNumber),
      createdAt: createDate(),
      text: comment.text,
    }))
  ], []);

// создание строк типа "('Текст', 'Текст-2'), ('Текст', 'Текст-2')"
const transformToViewForInsert = (valuesForTable) => valuesForTable
  .map((valuesForRow) => `'${valuesForRow.join(`', '`)}'`)
  .reduce((acc, valuesForRow) => acc.length > 0 ? `${acc},\n    (${valuesForRow})` : `  (${valuesForRow})`, ``);

const createArticlesPictureGenerator = (articlesNumber) => {
  const pictureList = shuffle(
      new Array(articlesNumber)
      .fill(null)
      .map((_val, index) => `picture-${index + 1}.jpg`));

  return () => pictureList.shift();
};

const getCategoryConnectionsFromArticles = (articles) => articles
  .reduce((acc, article, articleIndex) => [
    ...acc,
    ...article.category.map((category) => [articleIndex + 1, category.id])
  ], []);

const createFillSqlContent = ({userValues, categoryValues, articleValues, articleCategoryValues, commentValues}) =>
  `  -- Добавление списка пользователей
  INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
  ${transformToViewForInsert(userValues)};

  -- Добавление списка категорий
  INSERT INTO categories(name) VALUES
  ${transformToViewForInsert(categoryValues)};

  -- Добавление списка статей
  ALTER TABLE articles DISABLE TRIGGER ALL;
  INSERT INTO articles(title, announce, fulltext, picture, user_id, created_at) VALUES
  ${transformToViewForInsert(articleValues)};
  ALTER TABLE articles ENABLE TRIGGER ALL;

  -- Добавление связей для статей и категорий
  ALTER TABLE article_categories DISABLE TRIGGER ALL;
  INSERT INTO article_categories(article_id, category_id) VALUES
  ${transformToViewForInsert(articleCategoryValues)};
  ALTER TABLE article_categories ENABLE TRIGGER ALL;

  -- Добавление списка комментариев
  ALTER TABLE comments DISABLE TRIGGER ALL;
  INSERT INTO COMMENTS(article_id, user_id, text, created_at) VALUES
  ${transformToViewForInsert(commentValues)};
  ALTER TABLE comments ENABLE TRIGGER ALL;`;

module.exports = {
  name: `--fill`,
  async run([adsNumber]) {
    const FILE_NAME = `fill-db.sql`;
    const numberForEntitiesCreation = Number(adsNumber) || DEFAULT_ARTICLE_NUMBER;

    if (numberForEntitiesCreation > MAX_ARTICLE_NUMBER) {
      breakProcessWithError(maxArticleLimitError);
      return;
    }

    const [
      titleList,
      categoryList,
      sentenceList,
      commentList,
      emailList,
      passwordHashList,
      firstNameForManList,
      firstNameForWomanList,
      lastNameList
    ] = await Promise.all([
      readDataFromFile(dataPath.titles),
      readDataFromFile(dataPath.categories),
      readDataFromFile(dataPath.sentences),
      readDataFromFile(dataPath.comments),
      readDataFromFile(dataPath.emails),
      readDataFromFile(dataPath.passwordHashes),
      readDataFromFile(dataPath.userFirstNamesForMan),
      readDataFromFile(dataPath.userFirstNamesForWoman),
      readDataFromFile(dataPath.userLastNames),
    ]);

    const {categories} = new CategoriesCreationService({categoryList});

    const {users} = new UsersCreationService({
      emailList,
      passwordHashList,
      firstNameForManList,
      firstNameForWomanList,
      lastNameList,
      avatarList: createAvatarList(numberForEntitiesCreation),
      usersNumberForCreation: numberForEntitiesCreation,
    });

    const {articles} = new ArticlesCreationService({
      articlesNumberForCreation: numberForEntitiesCreation,
      titles: titleList,
      categories,
      sentences: sentenceList,
      comments: commentList
    });

    const getPictureForArticle = createArticlesPictureGenerator(articles.length);
    const enhancedArticles = articles.map((article) => ({
      ...article,
      announce: article.announce.join(` `),
      fullText: article.fullText.join(` `),
      picture: getPictureForArticle(),
      userId: getRandomInt(1, users.length),
    }));

    const comments = createCommentListFromArticles(enhancedArticles, users.length);

    const fileContent = createFillSqlContent({
      categoryValues: categories.map(({name}) => [name]),
      userValues: users.map((user) => [
        user.email,
        user.passwordHash,
        user.firstName,
        user.lastName,
        user.avatar,
      ]),
      articleValues: enhancedArticles.map((article) => [
        article.title,
        article.announce,
        article.fullText,
        article.picture,
        article.userId,
        article.createdDate,
      ]),
      articleCategoryValues: getCategoryConnectionsFromArticles(enhancedArticles),
      commentValues: comments.map((comment) => [
        comment.articleId,
        comment.userId,
        comment.text,
        comment.createdAt,
      ]),
    });

    writeResultInFile(fileContent, FILE_NAME);
  }
};
