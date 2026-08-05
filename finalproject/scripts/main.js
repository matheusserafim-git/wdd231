import "./menu.js";
import "./theme.js";
import { getCourses } from "./fetch.js";
import { saveItem } from "./storage.js";

const container = document.querySelector("#featuredCourses");
const searchInput = document.querySelector("#search");
const exploreBtn = document.querySelector("#explore");

// Salva o termo pesquisado e navega para courses.html
function handleSearch() {
    const query = searchInput ? searchInput.value.trim() : "";
    saveItem("search", query);
    window.location.href = "courses.html";
}

// Evento de clique no botão Explore
if (exploreBtn) {
    exploreBtn.addEventListener("click", handleSearch);
}

// Evento ao pressionar a tecla Enter no campo de busca
if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    });
}

async function displayCourses() {
    const courses = await getCourses();

    if (!courses || courses.length === 0) {
        console.error("Nenhum curso foi encontrado. Verifique o arquivo JSON.");
        return;
    }

    const featured = courses.slice(0, 3);
    container.innerHTML = "";

    featured.forEach(course => {
        const card = document.createElement("article");
        card.classList.add("course-card");

        card.innerHTML = `
            <img src="${course.image}" alt="${course.title}" loading="lazy">
            <h3>${course.title}</h3>
            <p><strong>Category:</strong> ${course.category}</p>
            <p><strong>Level:</strong> ${course.level}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <div class="card-actions">
                <a href="courses.html" class="button btn-featured">Explore All Courses</a>
            </div>
        `;

        container.appendChild(card);
    });
}

displayCourses();