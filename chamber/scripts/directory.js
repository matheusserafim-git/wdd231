const directory = document.querySelector("#directory");

const url = "data/members.json";

async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erro ao carregar o JSON");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error(error);
    }
}

function displayMembers(members) {

    members.forEach(member => {

        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `

        <h2>${member.name}</h2>

        <p class="tag">${member.description}</p>

        <div class="card-content">

        <img src="${member.image}" alt="${member.name}">

        <div class="member-info">

        <p><strong>EMAIL:</strong> ${member.email}</p>

        <p><strong>PHONE:</strong> ${member.phone}</p>

        <p><strong>URL:</strong> 
        <a href="${member.website}">
        ${member.website}
        </a>
        </p>

        </div>

        </div>

        `;;

        directory.appendChild(card);

    });

}

getMembers();

const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

gridBtn.addEventListener("click", () => {

    directory.classList.add("grid-view");
    directory.classList.remove("list-view");

    gridBtn.classList.add("active");
    listBtn.classList.remove("active");

});

listBtn.addEventListener("click", () => {

    directory.classList.add("list-view");
    directory.classList.remove("grid-view");

    listBtn.classList.add("active");
    gridBtn.classList.remove("active");

});

//footer

const yearEl = document.getElementById("currentyear");
const modifiedEl = document.getElementById("lastModified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modifiedEl) modifiedEl.textContent = document.lastModified;