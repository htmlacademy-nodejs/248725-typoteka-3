'use strict';

const themeList = [
  {
    withPadding: false,
    countNumber: 88,
    name: `Автомобили`,
  },
  {
    withPadding: false,
    countNumber: 13,
    name: `Удаленная работа`,
  },
  {
    withPadding: false,
    countNumber: 13,
    name: `Бизнес`,
  },
  {
    withPadding: false,
    countNumber: 13,
    name: `Путешествия`,
  },
  {
    withPadding: true,
    countNumber: 13,
    name: `Дизайн и обустройство`,
  },
  {
    withPadding: false,
    countNumber: 22,
    name: `Производство игрушек`,
  },
  {
    withPadding: false,
    countNumber: 22,
    name: `UX & UI`,
  },
];

const hotList = [
  {
    content: `Билл Гейтс впервые за два года возглавил рейтинг самых богатых людей мира по версии Bloomberg`,
    countNumber: 12,
  },
  {
    content: `Сервис для аналитики Telegram-чатов Combot попал под блокировку из-за информации на служебной странице`,
    countNumber: 15,
  },
  {
    content: `Модель Кайли Дженнер продаст 51% своей компании Kylie Cosmetics владельцу Factor за $600 млн`,
    countNumber: 52,
    withMargin: true,
  },
  {
    content: `Tesla получила 146 тысяч предзаказов на электрический пикап Cybertruck за двое суток`,
    countNumber: 153,
  }
];

const lastCommentariesList = [
  {
    author: `Анна Артамонова`,
    img: `img/avatar-small-1.png`,
    linkText: `Сервис аренды жилья Airbnb стал глобальным партнером Международного олимпийского комитета (МОК)
      на девять лет, в течение которых пройдет пять Олимпиад, в том числе в Токио в 2020 году.`,
  },
  {
    author: `Александр Петров`,
    img: `img/avatar-small-2.png`,
    linkText: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты с матом`,
  },
  {
    author: `Игорь Шманский`,
    img: `img/avatar-small-3.png`,
    linkText: `Что-то все электрокары в последнее время все на одно лицо делаются))`,
  },
];

const previewList = [
  {
    breadcrumbs: [`Дизайн`, `Удаленная работа`],
    datetime: {
      value: `2019-03-21T20:33`,
      readableValue: `21.03.2019, 20:33`,
    },
    title: `Я ничего не понял`,
    content: `Если вы сами пишете такие письма — почитайте Ильяхова. А в этой заметке я расскажу про заклинание, которое от таких писем помогает.`,
    commentNumber: 12,
    imgInfo: {name: `skyscraper`, alt: `Фотография небоскреба`}
  },
  {
    breadcrumbs: [`Фриланс`],
    datetime: {
      value: `2019-03-21T20:33`,
      readableValue: `21.03.2019, 20:33`,
    },
    title: `Путешествие в Голландию`,
    content: `Если вы сами пишете такие письма — почитайте Ильяхова. А в этой заметке я расскажу про заклинание, которое от таких писем помогает.`,
    commentNumber: 12,
    imgInfo: {name: `sea`, alt: `Фотография моря`}
  },
  {
    breadcrumbs: [`Фриланс`],
    datetime: {
      value: `2019-03-21T20:33`,
      readableValue: `21.03.2019, 20:33`,
    },
    title: `Путин подписал закон о предустановке российских приложений на смартфоны и другую электронику`,
    content: `Президент России Владимир Путин подписал закон об обязательной предустановке российского программного
        обеспечения на электронную технику, продаваемую в России. Документ опубликован на официальном сайте правовой информации.`,
    commentNumber: 12,
  },
  {
    breadcrumbs: [`Дизайн`, `Удаленная работа`],
    datetime: {
      value: `2019-03-21T20:33`,
      readableValue: `21.03.2019, 20:33`,
    },
    title: `Я понял, но не все`,
    content: `Если вы сами пишете такие письма — почитайте Ильяхова. А в этой заметке я расскажу про заклинание, которое от таких писем помогает.`,
    commentNumber: 12,
    imgInfo: {name: `forest`, alt: `Фотография леса`}
  },
];

module.exports = {
  themeList,
  hotList,
  lastCommentariesList,
  previewList,
};
