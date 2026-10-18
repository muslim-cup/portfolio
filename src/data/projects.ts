export type Variant = 'chat' | 'shop' | 'card' | 'saas'
export interface Project {
  id: string; title: string; category: string; real: boolean; variant: Variant
  summary: string; stack: string[]; role: string; task: string
}
export const projects: Project[] = [
  { id: 'taskin', title: 'Taskin', category: 'Веб-приложение · коммерческий проект', real: true, variant: 'chat',
    summary: 'Frontend веб-приложения: интерфейсы, работа с API и чат в реальном времени. Показан в нейтральном формате — код и данные закрыты.',
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'REST API', 'WebSocket'],
    role: 'Frontend-разработка в команде с ноября 2025: интеграция с API, отдельные интерфейсы и компоненты, отладка и исправление ошибок.',
    task: 'Чат: сообщения, статусы, участники и непрочитанные; загрузка файлов через API ссылок; страницы FAQ, 404, верификации и ограничений аккаунта.' },
  { id: 'shop', title: 'Витрина одежды', category: 'DEMO / CONCEPT', real: false, variant: 'shop',
    summary: 'Концепт интерфейса магазина одежды: каталог, категории, карточка товара. Не коммерческий заказ.',
    stack: ['React', 'TypeScript', 'CSS Modules'],
    role: 'Дизайн-направление и вёрстка концепта.', task: 'Показать, как каталог выглядит и ведёт себя на смартфоне и десктопе.' },
  { id: 'card', title: 'Сайт-визитка', category: 'DEMO / CONCEPT', real: false, variant: 'card',
    summary: 'Концепт одностраничного сайта для специалиста или небольшой компании. Не коммерческий заказ.',
    stack: ['React', 'TypeScript', 'Vite'],
    role: 'Структура, вёрстка, адаптивность.', task: 'Понятно и быстро представить услугу и дать способ связаться.' },
  { id: 'saas', title: 'SaaS-интерфейс', category: 'DEMO / CONCEPT', real: false, variant: 'saas',
    summary: 'Концепт панели управления с данными и состояниями. Не коммерческий заказ.',
    stack: ['React', 'TypeScript', 'RTK Query'],
    role: 'Компоненты и состояния интерфейса.', task: 'Показать загрузку, пустые и ошибочные состояния.' },
]
