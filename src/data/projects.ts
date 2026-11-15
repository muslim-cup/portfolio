export type Variant = 'chat' | 'shop' | 'barber' | 'resto'

export interface Project {
  id: string
  title: string
  real: boolean // false — на карточке будет подпись «Концепт»
  variant: Variant // какой макет рисовать, пока нет скриншота
  summary: string
  image: string // скриншот для рамки браузера, например 'images/projects/taskin.png'
  imageMobile: string // скриншот для рамки телефона
}

export const projects: Project[] = [
  { id: 'taskin', title: 'Taskin', real: true, variant: 'chat',
    summary: 'Веб-приложение с чатом в реальном времени. Разработка интерфейса в команде. Проект закрытый, поэтому показан условный макет.',
    image: '', imageMobile: '' },
  { id: 'shop', title: 'Магазин одежды', real: false, variant: 'shop',
    summary: 'Каталог, категории и карточка товара, удобные с телефона.',
    image: '', imageMobile: '' },
  { id: 'barber', title: 'Барбершоп', real: false, variant: 'barber',
    summary: 'Услуги, мастера, цены и запись в пару касаний.',
    image: '', imageMobile: '' },
  { id: 'resto', title: 'Ресторан', real: false, variant: 'resto',
    summary: 'Меню по разделам, бронь столика, адрес и часы работы.',
    image: '', imageMobile: '' },
]
