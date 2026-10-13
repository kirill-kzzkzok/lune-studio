import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/footer.css";
import "./styles/overrides.css";
import { services, masters, reviews, faqs } from "./data.js";
import { initBooking } from "./booking.js";
import { initPhoneInput } from "./form.js";
import { initUI } from "./ui.js";
import heroImage from "./assets/atmosphere/interior.jpg";
import waitingImage from "./assets/atmosphere/waiting.webp";
import workplaceImage from "./assets/atmosphere/workplace.jpg";
import materialsImage from "./assets/atmosphere/materials.webp";
import annaPhoto from "./assets/masters/anna.png";
import elenaPhoto from "./assets/masters/elena.png";
import sofiaPhoto from "./assets/masters/sofia.png";

const masterPhotos = [annaPhoto, elenaPhoto, sofiaPhoto];

// --- Рендер карточек из демо-данных ---

document.querySelector("#service-grid").innerHTML = services
  .map(
    (s) => `
      <article class="service-card reveal">
        <p>${s.duration}</p>
        <h3>${s.title}</h3>
        <p class="service-text">${s.text}</p>
        <div>
          <strong>${s.price}</strong>
          <a href="#booking">Выбрать <span>→</span></a>
        </div>
      </article>`,
  )
  .join("");

document.querySelector("#master-grid").innerHTML = masters
  .map(
    (m, i) => `
      <article class="master-card reveal">
        <img class="master-portrait" src="${masterPhotos[i]}" alt="${m.name}" />
        <div>
          <p>${m.role}</p>
          <h3>${m.name}</h3>
          <small>${m.specialty}</small>
          <div
            class="master-rating"
            aria-label="Рейтинг ${m.rating} из 5"
          >
            <span>★</span>
            <b>${m.rating}</b>
            <em>${m.reviewCount} отзывов</em>
          </div>
          <p class="master-text">${m.text}</p>
          <a class="text-link" href="#booking">Выбрать мастера →</a>
        </div>
      </article>`,
  )
  .join("");

document.querySelector("#review-grid").innerHTML = reviews
  .map(
    (r) => `
      <article class="review-card reveal">
        <div class="review-head">
          <span class="review-avatar" aria-hidden="true">${r.name[0]}</span>
          <span class="review-score">★ ${r.rating}</span>
        </div>
        <blockquote>«${r.text}»</blockquote>
        <b>${r.name}</b>
        <small>Была у ${r.master} · ${r.service}</small>
      </article>`,
  )
  .join("");

document.querySelector("#faq-list").innerHTML = faqs
  .map(
    ([q, a]) => `
      <details class="reveal">
        <summary>${q}<span>+</span></summary>
        <p>${a}</p>
      </details>`,
  )
  .join("");

initBooking();
initPhoneInput();
initUI();

// --- Изображения ---

document.querySelector(".hero-image").src = heroImage;

const atmosphereImages = {
  waiting: waitingImage,
  workplace: workplaceImage,
  materials: materialsImage,
};

document.querySelectorAll("[data-image]").forEach((image) => {
  image.src = atmosphereImages[image.dataset.image];
});

// --- Подстановка актуального демо-контента ---

document.querySelectorAll('.button[href="#booking"]').forEach((btn) => {
  if (btn.closest(".hero-actions,.final-cta,.site-header"))
    btn.innerHTML = "Записаться на процедуру <span>→</span>";
});

const heroServicesLink = document.querySelector(".hero-actions .text-link");
if (heroServicesLink)
  heroServicesLink.innerHTML = "Смотреть цены <span>↓</span>";

const heroEyebrow = document.querySelector(".hero-copy .eyebrow");
if (heroEyebrow) heroEyebrow.textContent = "Салон красоты · Москва-Сити";

const heroLead = document.querySelector(".hero-copy .lead");
if (heroLead)
  heroLead.textContent =
    "Маникюр, педикюр, массаж и окрашивание в центре Москвы.";

const heroUsp = document.querySelector(".hero-usp");
if (heroUsp)
  heroUsp.innerHTML =
    "<span>Запись онлайн</span> – выберите услугу, мастера и свободное время.";

const servicesTitle = document.querySelector(".services-section h2");
if (servicesTitle) servicesTitle.textContent = "Услуги и цены";

const servicesSub = document.querySelector(
  ".services-section .section-heading>p:not(.eyebrow)",
);
if (servicesSub)
  servicesSub.textContent = "Выберите процедуру и подходящее время.";

const mastersTitle = document.querySelector(".masters-section h2");
if (mastersTitle) mastersTitle.textContent = "Мастера";

// Ссылки «О салоне» и «Отзывы» скрывы — убираем их из навигации
document
  .querySelectorAll(
    '.navigation a[href="#about"],.navigation a[href="#reviews"]',
  )
  .forEach((link) => {
    if (link.getAttribute("href") === "#about") link.remove();
  });

const contactRow = (label) =>
  [...document.querySelectorAll(".contact-copy dt")].find(
    (item) => item.textContent === label,
  )?.nextElementSibling;

const address = contactRow("Адрес");
if (address) address.textContent = "Москва-Сити, Пресненская набережная, 8";

const telegramContact = contactRow("Telegram");
if (telegramContact)
  telegramContact.innerHTML =
    '<a href="https://t.me/lune_studio_demo" target="_blank" rel="noreferrer">@lune_studio_demo ↗</a>';

// Прощальный экран скрывается сам через паузу
window.setTimeout(
  () => document.querySelector(".welcome-screen")?.classList.add("is-hidden"),
  1450,
);
