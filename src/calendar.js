const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
export const formatDate = (date) =>
  date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const key = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
export function renderCalendar(
  container,
  viewDate,
  selectedDate,
  onChangeMonth,
  onSelect,
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = viewDate.getFullYear(),
    month = viewDate.getMonth();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  container.innerHTML = `<div class="calendar-header"><button aria-label="Предыдущий месяц" data-calendar-nav="-1">←</button><strong>${monthNames[month]} ${year}</strong><button aria-label="Следующий месяц" data-calendar-nav="1">→</button></div><div class="weekdays">${weekdays.map((x) => `<span>${x}</span>`).join("")}</div><div class="calendar-days">${Array(firstDay).fill("<span></span>").join("")}${Array.from(
    { length: days },
    (_, i) => {
      const d = new Date(year, month, i + 1);
      d.setHours(0, 0, 0, 0);
      const past = d < today;
      const selected = selectedDate && key(d) === key(selectedDate);
      return `<button ${past ? "disabled" : ""} class="${past ? "past" : ""} ${selected ? "selected" : ""}" data-date="${d.toISOString()}">${i + 1}</button>`;
    },
  ).join("")}</div>`;
  container
    .querySelectorAll("[data-calendar-nav]")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        onChangeMonth(Number(btn.dataset.calendarNav)),
      ),
    );
  container
    .querySelectorAll("[data-date]")
    .forEach((btn) =>
      btn.addEventListener("click", () => onSelect(new Date(btn.dataset.date))),
    );
}
