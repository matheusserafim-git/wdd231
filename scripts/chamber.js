// scripts/main.js
// Handles the responsive nav toggle and the two dynamic footer values.

const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");

menuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("site-nav--open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.textContent = isOpen ? "✕" : "☰";
});

menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

// Close the mobile menu again once the viewport grows past the breakpoint.
const desktopQuery = window.matchMedia("(min-width: 700px)");
desktopQuery.addEventListener("change", (event) => {
  if (event.matches) {
    siteNav.classList.remove("site-nav--open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// scripts/courses.js
// Data source for the "Web Certificate Courses" section.
// Edit the `completed` flag on each course to reflect your own progress —
// the page updates itself automatically, nothing else needs to change.

const courses = [
  { code: "WDD 130", title: "Web Fundamentals", credits: 2, subject: "WDD", completed: true },
  { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 2, subject: "WDD", completed: true },
  { code: "CSE 111", title: "Programming with Functions", credits: 2, subject: "CSE", completed: true },
  { code: "CSE 210", title: "Programming with Classes", credits: 3, subject: "CSE", completed: false },
  { code: "WDD 231", title: "Web Frontend Development I", credits: 3, subject: "WDD", completed: false },
  { code: "CSE 212", title: "Programming with Data Structures", credits: 2, subject: "CSE", completed: false },
];

const courseList = document.getElementById("courseList");
const creditTotal = document.getElementById("creditTotal");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderCourses(subject) {
  const visible =
    subject === "All" ? courses : courses.filter((course) => course.subject === subject);

  courseList.innerHTML = "";

  visible.forEach((course) => {
    const card = document.createElement("li");
    card.className = "course-card" + (course.completed ? " course-card--done" : "");

    card.innerHTML = `
      <span class="course-card__status" aria-hidden="true">${course.completed ? "✓" : "•"}</span>
      <span class="course-card__code">${course.code}</span>
      <span class="course-card__title">${course.title}</span>
      <span class="course-card__credits">${course.credits} cr</span>
    `;

    courseList.appendChild(card);
  });

  const total = visible.reduce((sum, course) => sum + course.credits, 0);
  creditTotal.textContent = total;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("filter-btn--active"));
    button.classList.add("filter-btn--active");
    renderCourses(button.dataset.subject);
  });
});

const frag = document.createDocumentFragment();

renderCourses("All");