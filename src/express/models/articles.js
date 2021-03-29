'use strict';

const articleData = {
  user: `Алёна Фролова`,
  userPicture: `avatar-2.png`,
  datetime: {
    value: `2019-03-21T20:33`,
    readableValue: `21.03.2019, 20:33`,
  },
  post: {
    title: `AirPods в один клик`,
    content: [
      {
        type: `title`,
        body: `Бирюзовое доверие`,
      },
      {
        type: `text`,
        body: `У Apple иногда попадаются интерфейсы, за которые создателей хочется сильно поругать — к примеру
        интерфейс публикации приложения в AppStore, для которого я уже неделю восстановливаю свой аккаунт разработчика.`
      },
      {
        type: `text`,
        body: `Или интерфейс подключения AirPods на макбуке. Чтобы переключить наушники между телефоном и компьютером,
        нужно сначала нажать на значок звука, затем дождаться, когда в списке устройств появятся наушники, потом
        нажать на них и дождаться, пока случится вся магия подключения. Иногда по загадочным причинам магия не
        случается, и операцию нужно повторить, выполняя все те же клики-ожидания-клики — бесит.`
      },
    ],
    img: {
      src: `sea-fullsize@1x.jpg`,
      dscr: `пейзаж море, скалы, пляж`,
    }
  },
  comments: [
    {
      author: `Евгений Петров`,
      userLogo: `avatar-1.png`,
      content: `Автор, ты все выдумал, покайся`,
      datetime: {
        value: `2019-03-21T20:33`,
        readableValue: `21.03.2019, 20:33`,
      }
    },
    {
      author: `Александр Марков`,
      userLogo: `avatar-5.png`,
      content: `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      datetime: {
        value: `2019-03-21T20:33`,
        readableValue: `21.03.2019, 20:33`,
      }
    },
    {
      author: `Евгений Петров`,
      userLogo: `avatar-4.png`,
      content: `Автор, ты все выдумал, покайся`,
      datetime: {
        value: `2019-03-21T20:33`,
        readableValue: `21.03.2019, 20:33`,
      }
    },
    {
      author: `Александр Марков`,
      userLogo: `avatar-3.png`,
      content: `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      datetime: {
        value: `2019-03-21T20:33`,
        readableValue: `21.03.2019, 20:33`,
      }
    },
  ],
  themes: [
    {name: `Автомобили`, number: 88},
    {name: `Удаленная работа`, number: 13},
    {name: `Бизнес`, number: 13}
  ],
};

const categoryThemeList = [
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
    isActive: true,
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

const categoryPreviewList = [
  {
    breadcrumbs: [`Дизайн`],
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
    breadcrumbs: [`Дизайн`],
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
    breadcrumbs: [`Дизайн`],
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
  articleData,
  categoryThemeList,
  categoryPreviewList,
};
