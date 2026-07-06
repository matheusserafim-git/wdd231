import { courses } from "./courseListArray.js";
console.log("IMPORT OK:", courses);

const courseList = document.getElementById("courseList");
const creditTotal = document.getElementById("creditTotal");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderCourses(subject) {
  const visible =
    subject === "All"
      ? courses
      : courses.filter(course => course.subject === subject);

  courseList.innerHTML = "";

  visible.forEach(course => {
    const card = document.createElement("li");
    card.className =
      "course-card" + (course.completed ? " course-card--done" : "");

    card.innerHTML = `
      <span class="course-card__status" aria-hidden="true">
        ${course.completed ? "✓" : "•"}
      </span>
      <span class="course-card__code">${course.number}</span>
      <span class="course-card__title">${course.title}</span>
      <span class="course-card__credits">${course.credits} cr</span>
    `;

    courseList.appendChild(card);
  });

  const totalCredits = visible.reduce((sum, c) => sum + c.credits, 0);
  creditTotal.textContent = totalCredits;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn =>
      btn.classList.remove("filter-btn--active")
    );

    button.classList.add("filter-btn--active");
    renderCourses(button.dataset.subject);
  });
});

// initial render
renderCourses("All");