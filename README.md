<div align="center">

# Luné Studio

**Сайт салона красоты с пошаговой онлайн-записью — на чистом JavaScript**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=flat-square&logo=vercel)](https://kirill-lune.vercel.app)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/ru/docs/Web/JavaScript)

[Демо](https://kirill-lune.vercel.app) · [English version](#english)

</div>

---

## 📖 О проекте

Luné Studio — демонстрационный адаптивный сайт салона красоты в Москве.
Проект сфокусирован не на статичном лендинге, а на **интерактивном
шестишаговом сценарии онлайн-записи**, построенном без UI-фреймворков и
внешних зависимостей: только vanilla JavaScript, HTML и CSS.

> ⚠️ Это демо-проект для портфолио: форма записи не отправляет данные и не
> создаёт реальных бронирований.

## ✨ Возможности

- 💅 **Каталог услуг и мастеров** — карточки рендерятся из локальных
  data-модулей: цены, длительность, специальности, рейтинги и отзывы
- 🧭 **Пошаговая запись (6 шагов)** — услуга → мастер → дата → время →
  контакты → подтверждение, с индикатором прогресса и навигацией «назад»
- 🔀 **Проверка совместимости услуг** — маникюр и педикюр можно объединить
  в один визит, услуги других направлений — нельзя
- 📅 **Календарь на месяц** — навигация по месяцам, блокировка прошедших
  дат, свободные и занятые слоты времени
- 🧑‍🎨 **Фильтрация мастеров** — показываются только специалисты, работающие
  со всеми выбранными услугами
- ✅ **Валидация на клиенте** — проверка имени и телефона с понятными
  сообщениями об ошибках
- 📱 **Адаптивная вёрстка** — мобильное меню, fixed-кнопка записи,
  кастомный приветственный экран
- 🎞 **Анимации появления** — IntersectionObserver + уважение
  `prefers-reduced-motion`
- 🗺 **Карта и контакты** — встроенная Яндекс Карта

## 🛠 Технологии

| Инструмент | Назначение |
| ---------- | ---------- |
| JavaScript (ES-модули) | вся логика без фреймворков и runtime-зависимостей |
| HTML5 / CSS3 | семантичная разметка, custom properties, grid/flex |
| Vite 7 | dev-сервер, сборка и корректные URL ассетов |
| Яндекс Карты | встроенная карта (iframe) |

## 🚀 Быстрый старт

```sh
# 1. Клонировать репозиторий
git clone https://github.com/kirill-kzzkzok/lune-studio.git
cd lune-studio

# 2. Установить зависимости
npm install

# 3. Запустить dev-сервер
npm run dev

# 4. Продакшен-сборка
npm run build && npm run preview
```

Требования: Node.js 18+ и npm.

## 📁 Структура проекта

```
lune-studio/
├── index.html                  # разметка страницы (RU)
├── package.json
├── src/
│   ├── main.js                 # точка входа: рендер карточек, тексты, изображения
│   ├── booking.js              # пошаговый сценарий записи (state + рендер шагов)
│   ├── calendar.js             # календарь месяца и форматирование дат
│   ├── form.js                 # маска ввода телефона
│   ├── ui.js                   # мобильное меню и анимации появления
│   ├── data.js                 # демо-данные: услуги, мастера, отзывы, FAQ, слоты
│   ├── styles/
│   │   ├── tokens.css          # дизайн-токены (цвета, радиусы, тени)
│   │   ├── base.css            # базовые стили и типографика
│   │   ├── components.css      # карточки, кнопки, FAQ, welcome-экран
│   │   ├── sections.css        # секции: hero, запись, календарь, контакты
│   │   ├── footer.css          # подвал
│   │   └── overrides.css       # точечные переопределения
│   └── assets/
│       ├── atmosphere/         # интерьер студии
│       └── masters/            # портреты мастеров
└── README.md
```

## 🔗 Демо

- **Live:** https://kirill-lune.vercel.app
- **GitHub:** https://github.com/kirill-kzzkzok/lune-studio

## 👤 Автор

**Кирилл** — [github.com/kirill-kzzkzok](https://github.com/kirill-kzzkzok)

---

<a name="english"></a>

<div align="center">

# Luné Studio

**A beauty salon website with a step-by-step online booking flow — built with vanilla JavaScript**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=flat-square&logo=vercel)](https://kirill-lune.vercel.app)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[Live demo](https://kirill-lune.vercel.app) · [Русская версия](#top)

</div>

---

## 📖 About

Luné Studio is a demo responsive website for a Moscow beauty salon.
The project focuses not on a static landing page but on an **interactive
six-step online booking flow**, built without UI frameworks or external
runtime dependencies — just vanilla JavaScript, HTML and CSS.

> ⚠️ This is a portfolio demo: the booking form does not submit data and
> does not create real appointments.

## ✨ Features

- 💅 **Services and masters catalog** — cards rendered from local data
  modules: prices, durations, specialties, ratings and reviews
- 🧭 **Six-step booking flow** — service → master → date → time →
  contacts → confirmation, with a progress indicator and back navigation
- 🔀 **Service compatibility check** — nail services can be combined in a
  single visit, other services cannot
- 📅 **Monthly calendar** — month navigation, past dates disabled, free
  and busy time slots
- 🧑‍🎨 **Master filtering** — only specialists who handle all selected
  services are shown
- ✅ **Client-side validation** — name and phone checks with clear error
  messages
- 📱 **Responsive layout** — mobile menu, fixed booking button, custom
  welcome screen
- 🎞 **Reveal animations** — IntersectionObserver with
  `prefers-reduced-motion` respect
- 🗺 **Map and contacts** — embedded Yandex Map

## 🛠 Tech Stack

| Tool | Purpose |
| ---- | ------- |
| JavaScript (ES modules) | all logic, no frameworks or runtime deps |
| HTML5 / CSS3 | semantic markup, custom properties, grid/flex |
| Vite 7 | dev server, build, correct asset URLs |
| Yandex Maps | embedded map (iframe) |

## 🚀 Quick Start

```sh
# 1. Clone the repository
git clone https://github.com/kirill-kzzkzok/lune-studio.git
cd lune-studio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Production build
npm run build && npm run preview
```

Requirements: Node.js 18+ and npm.

## 📁 Project Structure

```
lune-studio/
├── index.html                  # page markup (RU)
├── package.json
├── src/
│   ├── main.js                 # entry point: card rendering, texts, images
│   ├── booking.js              # step-by-step booking flow (state + step views)
│   ├── calendar.js             # month calendar and date formatting
│   ├── form.js                 # phone input mask
│   ├── ui.js                   # mobile menu and reveal animations
│   ├── data.js                 # demo data: services, masters, reviews, FAQ, slots
│   ├── styles/
│   │   ├── tokens.css          # design tokens (colors, radii, shadows)
│   │   ├── base.css            # base styles and typography
│   │   ├── components.css      # cards, buttons, FAQ, welcome screen
│   │   ├── sections.css        # sections: hero, booking, calendar, contacts
│   │   ├── footer.css          # footer
│   │   └── overrides.css       # targeted overrides
│   └── assets/
│       ├── atmosphere/         # studio interior
│       └── masters/            # master portraits
└── README.md
```

## 🔗 Links

- **Live:** https://kirill-lune.vercel.app
- **GitHub:** https://github.com/kirill-kzzkzok/lune-studio

## 👤 Author

**Kirill** — [github.com/kirill-kzzkzok](https://github.com/kirill-kzzkzok)
