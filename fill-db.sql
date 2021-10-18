-- Добавление списка пользователей
INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
  ('strawberry-fan@gmail.com', '9c249d94f81b4c0ab73d5ee22e42e8d3', 'Ксения', 'Аксентьева', 'avatar-5.jpg'),
  ('pomegranate-fan@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Любовь', 'Петрова', 'avatar-3.jpg'),
  ('potato-fan@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Игорь', 'Петров', 'avatar-5.jpg'),
  ('peach-fan@gmail.com', '431fb2cc3b0544dcb37c3bd30b020cc9', 'Наталья', 'Петрова', 'avatar-2.jpg'),
  ('orange-fan@gmail.com', '5148bbaf23ed45d1927e132a7fafc3b3', 'Оксана', 'Борзунова', 'avatar-5.jpg');

-- Добавление списка категорий
INSERT INTO categories(name) VALUES
  ('За жизнь'),
  ('Железо'),
  ('Разное'),
  ('Шапито'),
  ('Кино'),
  ('Музыка'),
  ('Без рамки'),
  ('Архитектура'),
  ('IT'),
  ('Живопись'),
  ('Программирование'),
  ('Деревья');

-- Добавление списка статей
ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, announce, fulltext, picture, user_id, created_at) VALUES
  ('Что такое золотое сечение', 'Цинизм, говорят, доказывает наличие интеллекта. С давних пор самым худшим врагом для человека был вовсе не чужеземец, а сосед. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Помните небольшое количество ежедневных упражнений лучше чем один раз но много.', 'Из под его пера вышло 8 платиновых альбомов. Помните небольшое количество ежедневных упражнений лучше чем один раз но много.', 'picture-5.jpg', '3', '2021-09-03 02:27:09'),
  ('Лучшие рок-музыканты 20-века', 'С давних пор самым худшим врагом для человека был вовсе не чужеземец, а сосед. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Достичь успеха помогут ежедневные повторения. Не может быть правилом то, из чего есть исключения. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?', 'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха.', 'picture-1.jpg', '5', '2021-08-13 08:00:22'),
  ('Как собрать камни бесконечности', 'Ёлки — это не просто красивое дерево. Это прочная древесина. Цинизм, говорят, доказывает наличие интеллекта.', 'Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Программировать не настолько сложно как об этом говорят.', 'picture-4.jpg', '4', '2021-09-17 04:54:13'),
  ('Самый лучший музыкальный альбом этого года', 'Он написал больше 30 хитов.', 'Собрать камни бесконечности легко если вы прирожденный герой. Он написал больше 30 хитов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Не может быть правилом то, из чего есть исключения. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 'picture-2.jpg', '3', '2021-08-04 21:41:09'),
  ('Рок — это протест', 'Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.', 'Он написал больше 30 хитов. Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно как об этом говорят. Альбом стал настоящим открытием года.', 'picture-3.jpg', '4', '2021-08-20 23:34:38');
ALTER TABLE articles ENABLE TRIGGER ALL;

-- Добавление связей для статей и категорий
ALTER TABLE article_categories DISABLE TRIGGER ALL;
INSERT INTO article_categories(article_id, category_id) VALUES
  ('1', '11'),
  ('1', '3'),
  ('1', '10'),
  ('2', '1'),
  ('2', '5'),
  ('3', '7'),
  ('3', '12'),
  ('3', '11'),
  ('4', '1'),
  ('4', '4'),
  ('4', '2'),
  ('4', '6'),
  ('5', '2'),
  ('5', '9'),
  ('5', '4'),
  ('5', '12'),
  ('5', '7'),
  ('5', '6');
ALTER TABLE article_categories ENABLE TRIGGER ALL;

-- Добавление списка комментариев
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(article_id, user_id, text, created_at) VALUES
  ('1', '1', 'Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Это где ж такие красоты?', '2021-08-14 14:22:01'),
  ('2', '5', 'Планируете записать видосик на эту тему? Согласен с автором! Плюсую, но слишком много буквы!', '2021-10-02 03:32:00'),
  ('3', '1', 'Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Согласен с автором! Мне не нравится ваш стиль.', '2021-08-04 13:03:01'),
  ('4', '4', 'Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', '2021-09-23 03:22:09'),
  ('5', '5', 'Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', '2021-09-04 17:00:15');
ALTER TABLE comments ENABLE TRIGGER ALL;