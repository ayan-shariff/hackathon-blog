const calendar = document.getElementById("calendar");
const eventForm = document.getElementById("eventForm");
const selectedDateElem = document.getElementById("selectedDate");
const eventList = document.getElementById("eventList");
const addEventForm = document.getElementById("addEventForm");
const eventTime = document.getElementById("eventTime");
const eventNote = document.getElementById("eventNote");
const currentMonthElem = document.getElementById("currentMonth");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();
let events = {};

function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  currentMonthElem.textContent = `${date.toLocaleString("default", {
    month: "long",
  })} ${year}`;
  calendar.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div class="day empty"></div>`;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = `${year}-${month + 1}-${i}`;
    calendar.innerHTML += `
<div class="day${events[day] ? " active" : ""}" data-date="${day}">
  <span>${i}</span>
</div>`;
  }
}

function showEvents(date) {
  selectedDateElem.textContent = date;
  eventList.innerHTML = "";

  if (events[date]) {
    events[date].forEach((event) => {
      const li = document.createElement("li");
      li.textContent = `${event.time} - ${event.note}`;
      eventList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "No events for this day.";
    eventList.appendChild(li);
  }
}

calendar.addEventListener("click", (e) => {
  if (e.target.closest(".day") && !e.target.classList.contains("empty")) {
    const date = e.target.closest(".day").dataset.date;
    showEvents(date);
    eventForm.style.display = "block";
  }
});

addEventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = selectedDateElem.textContent;
  const time = eventTime.value;
  const note = eventNote.value;

  if (!events[date]) {
    events[date] = [];
  }

  events[date].push({ time, note });

  generateCalendar(currentDate);
  showEvents(date);
  addEventForm.reset();
});

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
});

// Initialize calendar
eventForm.style.display = "none";
generateCalendar(currentDate);
