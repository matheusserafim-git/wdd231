import "./menu.js";
import "./theme.js";
import { getCourses } from "./fetch.js";

const container = document.querySelector("#featuredCourses");

async function displayCourses() {

    const courses = await getCourses();

    const featured = courses.slice(0,3);

    featured.forEach(course => {

        const card = document.createElement("article");

        card.classList.add("course-card");

        card.innerHTML = `

            <img src="${course.image}"
                 alt="${course.title}"
                 loading="lazy">

            <h3>${course.title}</h3>

            <p><strong>Category:</strong> ${course.category}</p>

            <p><strong>Level:</strong> ${course.level}</p>

            <p><strong>Duration:</strong> ${course.duration}</p>

        `;

        container.appendChild(card);

    });

}

displayCourses();