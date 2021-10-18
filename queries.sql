SELECT id, name FROM categories;

SELECT
  id,
  name
FROM categories
WHERE id IN (SELECT ac.category_id FROM article_categories as ac);

SELECT
  id,
  name,
  count(id)
FROM categories
LEFT JOIN article_categories as ac on categories.id = ac.category_id
GROUP BY id;

SELECT
  articles.id,
  articles.title,
  articles.announce,
  articles.created_at,
  concat(users.first_name, ' ', users.last_name),
  users.email,
  concat(DISTINCT comments.id),
  string_agg(categories.name, ', ')
FROM articles
INNER JOIN users ON articles.user_id = users.id
INNER JOIN comments ON articles.id = comments.article_id
INNER JOIN article_categories as ac ON articles.id = ac.article_id
INNER JOIN categories ON categories.id = ac.category_id
GROUP BY articles.id, users.id, articles.created_at, comments.article_id, ac.article_id
ORDER BY articles.created_at;

SELECT
  articles.id,
  articles.title,
  articles.announce,
  articles.fulltext,
  articles.created_at,
  articles.picture,
  concat(users.first_name, ' ', users.last_name),
  users.email,
  count(DISTINCT comments.id),
  string_agg(categories.name, ', ')
FROM articles
INNER JOIN users ON articles.user_id = users.id
INNER JOIN comments ON articles.id = comments.article_id
INNER JOIN article_categories as ac ON articles.id = ac.article_id
INNER JOIN categories ON categories.id = ac.category_id
WHERE articles.id = 1
GROUP BY articles.id, users.id, articles.created_at, comments.article_id, ac.article_id;

SELECT
  comments.id,
  comments.article_id,
  concat(users.first_name, ' ', users.last_name),
  comments.text
FROM comments
LEFT JOIN users ON comments.user_id = users.id
ORDER BY comments.created_at DESC
LIMIT 5;

SELECT
  comments.id,
  comments.article_id,
  concat(users.first_name, ' ', users.last_name),
  comments.text
FROM comments
LEFT JOIN users ON comments.user_id = users.id
LEFT JOIN articles on comments.article_id = articles.id
WHERE articles.id = 1;

UPDATE articles SET title = 'Как я встретил Новый год' WHERE id = 1;
