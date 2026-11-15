// Все данные студии — здесь. Пустые значения ('') на сайте не показываются.
export const site = {
  name: 'FRAMEO.STUDIO',
  tagline: 'Digital design & development',
  city: 'Грозный',
  available: true, // true — «Принимаю проекты», false — «Сейчас занят»

  // Контакты
  telegram: 'tobiib', // username без @
  instagram: 'frameoo.studio', // username без @
  email: 'muslimefremov1@gmail.com',
  github: 'https://github.com/muslim-cup',

  // Заполните сами
  founder: '', // имя основателя, например 'Муслим'
  photo: '', // ваше фото, например 'images/founder.jpg' (файл положите в public/images)

  // Цены «от» по услугам, например 'от 30 000 ₽'
  prices: {
    landing: '',
    corporate: '',
    shop: '',
    card: '',
    custom: '',
    redesign: '',
  },
}

export type PriceKey = keyof typeof site.prices
