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

// Ключ даты без учёта времени — для сравнения выбранного дня
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

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Пн-первый день: смещаем воскресенье (getDay()=0) в конец недели
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayButtons = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(year, month, i + 1);
    d.setHours(0, 0, 0, 0);
    const past = d < today;
    const selected = selectedDate && key(d) === key(selectedDate);
    const classes = `${past ? "past" : ""} ${selected ? "selected" : ""}`;
    return `<button ${past ? "disabled" : ""} class="${classes}" data-date="${d.toISOString()}">${i + 1}</button>`;
  });

  container.innerHTML = `
    <div class="calendar-header">
      <button aria-label="Предыдущий месяц" data-calendar-nav="-1">←</button>
      <strong>${monthNames[month]} ${year}</strong>
      <button aria-label="Следующий месяц" data-calendar-nav="1">→</button>
    </div>
    <div class="weekdays">
      ${weekdays.map((x) => `<span>${x}</span>`).join("")}
    </div>
    <div class="calendar-days">
      ${Array(firstDayOffset).fill("<span></span>").join("")}
      ${dayButtons.join("")}
    </div>`;

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
