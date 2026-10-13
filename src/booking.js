import { services, masters, availableTimes, busyTimes } from "./data.js";
import { renderCalendar, formatDate } from "./calendar.js";
import annaPhoto from "./assets/masters/anna.png";
import elenaPhoto from "./assets/masters/elena.png";
import sofiaPhoto from "./assets/masters/sofia.png";

const masterPhotos = { anna: annaPhoto, elena: elenaPhoto, sofia: sofiaPhoto };

const labels = ["Услуга", "Мастер", "Дата", "Время", "Контакты", "Готово"];

const state = {
  step: 1,
  services: [],
  master: null,
  date: null,
  time: null,
  viewDate: new Date(),
  name: "",
  phone: "",
  notice: "",
};

// Услуги ногтевого сервиса допустимо совмещать в одном визите
const NAIL_SERVICE_IDS = [
  "mani-cover",
  "mani",
  "pedi-cover",
  "pedi",
  "strength",
];

function canCombine(current, next) {
  if (!current.length) return true;
  const ids = [...current.map((s) => s.id), next.id];
  return ids.every((id) => NAIL_SERVICE_IDS.includes(id));
}

export function initBooking() {
  render();
}

function updateIndicator() {
  document.querySelector("#booking-indicator").innerHTML = labels
    .map((label, i) => {
      const status =
        i + 1 === state.step ? "active" : i + 1 < state.step ? "done" : "";
      const mark = i + 1 < state.step ? "✓" : i + 1;
      return `<span class="${status}"><b>${mark}</b>${label}</span>`;
    })
    .join("");
}

function controls(back = state.step > 1) {
  const backButton = back
    ? '<button class="button button-ghost" data-back>← Назад</button>'
    : "<span></span>";
  const nextLabel = state.step === 5 ? "Подтвердить запись" : "Продолжить →";
  return `
    <div class="booking-controls">
      ${backButton}
      <button class="button" data-next>${nextLabel}</button>
    </div>`;
}

function renderStep1() {
  return `
    <div class="booking-heading">
      <span>Шаг 1 из 6</span>
      <h3>Что будем делать?</h3>
      <p>Выберите одну процедуру или несколько совместимых.</p>
    </div>
    ${
      state.notice
        ? `<p class="booking-notice" role="status">${state.notice}</p>`
        : ""
    }
    <div class="choice-list">
      ${services
        .map((s) => {
          const selected = state.services.some((item) => item.id === s.id);
          return `
        <button
          class="choice-card ${selected ? "selected" : ""}"
          data-service="${s.id}"
        >
          <span>
            <b>${s.title}</b>
            <small>${s.duration}</small>
          </span>
          <span class="choice-meta">
            <strong>${s.price}</strong>
            <span class="choice-check" aria-hidden="true">${selected ? "✓" : "+"}</span>
          </span>
        </button>`;
        })
        .join("")}
    </div>
    ${controls(false)}`;
}

function renderStep2() {
  const eligible = masters.filter(
    (m) =>
      state.services.length === 0 ||
      state.services.every((s) => m.serviceIds?.includes(s.id)),
  );
  return `
    <div class="booking-heading">
      <span>Шаг 2 из 6</span>
      <h3>Выберите мастера</h3>
      <p>Показываем специалистов, которые работают со всеми выбранными услугами.</p>
    </div>
    <div class="master-choice">
      ${eligible
        .map((m) => {
          const selected = state.master?.id === m.id;
          return `
        <button
          class="master-option ${selected ? "selected" : ""}"
          data-master="${m.id}"
        >
          <img class="mini-master-photo" src="${masterPhotos[m.id]}" alt="" />
          <span>
            <b>${m.name}</b>
            <small>${m.role}<br>${m.specialty}</small>
            <em>★ ${m.rating} · ${m.reviewCount} отзывов</em>
          </span>
        </button>`;
        })
        .join("")}
    </div>
    ${controls()}`;
}

function renderStep3() {
  return `
    <div class="booking-heading">
      <span>Шаг 3 из 6</span>
      <h3>Выберите дату</h3>
    </div>
    <div class="calendar" id="calendar"></div>
    ${controls()}`;
}

function renderStep4() {
  return `
    <div class="booking-heading">
      <span>Шаг 4 из 6</span>
      <h3>Выберите время</h3>
      <p>${state.date ? formatDate(state.date) : ""}</p>
    </div>
    <div class="time-grid">
      ${availableTimes
        .map(
          (t) => `
        <button
          class="time-slot ${state.time === t ? "selected" : ""}"
          data-time="${t}"
        >
          ${t}<small>свободно</small>
        </button>`,
        )
        .join("")}
      ${busyTimes
        .map(
          (t) => `
        <button class="time-slot busy" disabled>
          ${t}<small>занято</small>
        </button>`,
        )
        .join("")}
    </div>
    ${controls()}`;
}

function renderStep5() {
  return `
    <div class="booking-heading">
      <span>Шаг 5 из 6</span>
      <h3>Оставьте контакты</h3>
      <p>Имя и телефон нужны, чтобы подтвердить запись.</p>
    </div>
    <form id="booking-form" novalidate>
      <label>
        Ваше имя
        <input
          name="name"
          value="${state.name}"
          autocomplete="name"
          placeholder="Например, Анна"
        />
      </label>
      <label>
        Номер телефона
        <input
          name="phone"
          value="${state.phone}"
          inputmode="tel"
          autocomplete="tel"
          placeholder="+7 (___) ___-__-__"
        />
      </label>
      <p class="form-error" id="form-error" aria-live="polite"></p>
    </form>
    ${controls()}`;
}

function renderStep6() {
  return `
    <div class="success">
      <span>✓</span>
      <p class="eyebrow">Демо-запись</p>
      <h3>Вы выбрали время. Это демонстрационный сценарий: данные не отправляются и запись не создаётся.</h3>
      <p>
        ${state.services.map((s) => s.title).join(" + ")} · ${state.master.name}<br />
        ${formatDate(state.date)} в ${state.time}
      </p>
      <button class="button button-ghost" data-restart>Пройти сценарий ещё раз</button>
    </div>`;
}

const stepRenderers = {
  1: renderStep1,
  2: renderStep2,
  3: renderStep3,
  4: renderStep4,
  5: renderStep5,
  6: renderStep6,
};

function render() {
  const app = document.querySelector("#booking-app");
  updateIndicator();
  app.innerHTML = stepRenderers[state.step]();
  bind(app);
  if (state.step === 3)
    renderCalendar(
      app.querySelector("#calendar"),
      state.viewDate,
      state.date,
      (offset) => {
        state.viewDate = new Date(
          state.viewDate.getFullYear(),
          state.viewDate.getMonth() + offset,
          1,
        );
        render();
      },
      (date) => {
        state.date = date;
        render();
      },
    );
}

function bind(app) {
  app.querySelectorAll("[data-service]").forEach(
    (x) =>
      (x.onclick = () => {
        const picked = services.find((s) => s.id === x.dataset.service);
        const exists = state.services.some((s) => s.id === picked.id);
        if (!exists && !canCombine(state.services, picked)) {
          state.notice =
            "Эти процедуры нельзя совместить у одного мастера. Выберите только услуги одного направления.";
          render();
          setTimeout(() => {
            state.notice = "";
            document.querySelector(".booking-notice")?.remove();
          }, 3400);
          return;
        }
        state.services = exists
          ? state.services.filter((s) => s.id !== picked.id)
          : [...state.services, picked];
        state.master = null;
        render();
      }),
  );
  app.querySelectorAll("[data-master]").forEach(
    (x) =>
      (x.onclick = () => {
        state.master = masters.find((m) => m.id === x.dataset.master);
        render();
      }),
  );
  app.querySelectorAll("[data-time]").forEach(
    (x) =>
      (x.onclick = () => {
        state.time = x.dataset.time;
        render();
      }),
  );
  app.querySelector("[data-back]")?.addEventListener("click", () => {
    state.step--;
    render();
  });
  app.querySelector("[data-next]")?.addEventListener("click", () => next());
  app.querySelector("[data-restart]")?.addEventListener("click", () => {
    Object.assign(state, {
      step: 1,
      services: [],
      master: null,
      date: null,
      time: null,
      name: "",
      phone: "",
    });
    render();
  });
}

function next() {
  if (
    (state.step === 1 && !state.services.length) ||
    (state.step === 2 && !state.master) ||
    (state.step === 3 && !state.date) ||
    (state.step === 4 && !state.time)
  )
    return;
  if (state.step === 5) {
    const name = document.querySelector("[name=name]").value.trim();
    const phone = document.querySelector("[name=phone]").value.trim();
    const error = document.querySelector("#form-error");
    if (name.length < 2) {
      error.textContent = "Пожалуйста, укажите имя.";
      return;
    }
    if (!/^\+?[\d\s()\-]{10,}$/.test(phone)) {
      error.textContent = "Пожалуйста, укажите корректный номер телефона.";
      return;
    }
    state.name = name;
    state.phone = phone;
  }
  state.step++;
  render();
  if (state.step === 2)
    setTimeout(
      () =>
        document
          .querySelector("#booking-app")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0,
    );
}
