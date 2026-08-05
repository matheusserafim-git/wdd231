import "./menu.js";
import "./theme.js";
import { getCourses } from "./fetch.js";
import { saveItem, getItem } from "./storage.js";

const container = document.querySelector("#coursesContainer");
const search = document.querySelector("#searchInput");
const dialog = document.querySelector("#courseDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialogBtn = document.querySelector("#closeDialog");

let allCourses = [];

loadCourses();

async function loadCourses() {
    allCourses = await getCourses();

    // Carrega a busca salva no localStorage caso o usuário tenha vindo do index.html
    const previousSearch = getItem("search");
    if (previousSearch) {
        search.value = previousSearch;
        filterCourses(previousSearch);
    } else {
        displayCourses(allCourses);
    }
}

function displayCourses(courses) {
    container.innerHTML = "";

    // Exibe mensagem quando nenhum curso for encontrado
    if (courses.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; padding: 2rem;">No courses found matching your search.</p>`;
        return;
    }

    courses.forEach(course => {
        const card = document.createElement("article");
        card.className = "course-card";
        card.innerHTML = `
            <img src="${course.image}" alt="${course.title}" loading="lazy">
            <h3>${course.title}</h3>
            <p><strong>Category:</strong> ${course.category}</p>
            <p><strong>Level:</strong> ${course.level}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <button class="details" data-id="${course.id}">View Details</button>
        `;
        container.appendChild(card);
    });

    activateButtons();
}

// Filtra tanto pelo nome/título quanto pela categoria do curso
function filterCourses(text) {
    const searchTerm = text.toLowerCase().trim();
    const filtered = allCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm)
    );
    displayCourses(filtered);
}

// Escuta a digitação no campo de pesquisa em tempo real
search.addEventListener("input", (e) => {
    const value = e.target.value;
    saveItem("search", value);
    filterCourses(value);
});

function activateButtons() {
    const buttons = document.querySelectorAll(".details");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const course = allCourses.find(c => c.id === id);
            if (course) showDialog(course);
        });
    });
}

function showDialog(course) {
    dialogContent.innerHTML = `
        <h2>${course.title}</h2>
        <p><strong>Category:</strong> ${course.category}</p>
        <p><strong>Level:</strong> ${course.level}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <p><strong>Description:</strong> ${course.description}</p>
    `;
    dialog.showModal();
}

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});