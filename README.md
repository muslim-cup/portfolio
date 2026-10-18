# muslim-cup — portfolio

React + TypeScript + Vite. Без UI-библиотек, без внешних картинок.

## Запуск
`npm install` → `npm run dev` · сборка: `npm run build` (папка `dist/`).

## Что заменить
Всё в `src/config/site.ts`: `telegram`, `email`, `available`. Проекты — `src/data/projects.ts`, услуги/процесс — `src/data/content.ts`.
Пока контакты пусты, форма **не отправляет** сообщение: она готовит текст, который можно скопировать. С `telegram` откроется чат с готовым текстом, с `email` — почтовый клиент.

## Настоящая отправка формы
Сайт статический, серверной части нет. Варианты: Formspree / Web3Forms / Netlify Forms (замените логику в `submit()` в `src/sections/Contact.tsx` на `fetch` POST на их endpoint и показывайте успех только при `response.ok`), либо собственный endpoint.

## Деплой
`npm run build`, затем залейте `dist/` на Netlify, Vercel, Cloudflare Pages или GitHub Pages (`base: './'` уже задан). Для OG-картинки добавьте `og:image` с абсолютным URL в `index.html`.
