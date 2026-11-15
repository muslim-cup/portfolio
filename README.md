# FRAMEO.STUDIO — сайт студии

React + TypeScript + Vite, обычный CSS. Без UI-библиотек и без чужих картинок.

## Запуск
`npm install` → `npm run dev` · сборка: `npm run build` (папка `dist/`).

## Где что менять
- `src/config/site.ts` — контакты, статус «Принимаю проекты», имя основателя, фото, цены «от». Пустые поля на сайте не показываются.
- `src/data/content.ts` — тексты: меню, услуги, ниши, этапы, тезисы о студии.
- `src/data/projects.ts` — проекты. `real: false` даёт подпись «Концепт».
- `src/styles/global.css` — цвета и шрифты в блоке `:root` в начале файла.
- `index.html` — title, description, og-теги, подключение шрифтов.

## Картинки (`public/images`)
Пока файла нет, показывается заглушка, сайт не ломается.
- `images/logo.png` — логотип. Без него в шапке стоит SVG-знак.
- Фото основателя — положите файл и укажите путь в `site.photo`, например `'images/founder.jpg'`.
- Скриншоты проектов — положите в `images/projects/` и укажите в `projects.ts`: `image` (для рамки браузера) и `imageMobile` (для рамки телефона).

## Форма заявки
Сервера нет. Форма собирает текст и открывает Telegram с готовым сообщением; человек отправляет его сам. Если `telegram` пуст — откроется почта, если пуста и она — текст можно скопировать. Логика в `submit()` в `src/sections/Contact.tsx`.

## Деплой
`npm run build`, затем залейте `dist/` на Netlify, Vercel, Cloudflare Pages или GitHub Pages (`base: './'` уже задан). После публикации добавьте в `index.html` тег `og:image` с полным адресом картинки.
