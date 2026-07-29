import {items} from '../data/items.mjs';

const container = document.getElementById('discover-container');

function displayItems(data) {
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('discover-card');

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.photo}" alt="${item.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        container.appendChild(card);
    });
}

displayItems(items);

// 2. Lógica do localStorage para visitas (Requisito 11)
const visitMessageContainer = document.getElementById('visit-message');
const lastVisit = Number(localStorage.getItem('lastVisit-ms')) || 0;
const currentVisit = Date.now();
const msInADay = 86400000;

if (lastVisit === 0) {
    visitMessageContainer.textContent = "Welcome! Please get in touch if you have any questions.";
} else {
    const timeDifference = currentVisit - lastVisit;
    const daysDifference = Math.floor(timeDifference / msInADay);

    if (timeDifference < msInADay) {
        visitMessageContainer.textContent = "I'm back so soon! Amazing!";
    } else if (daysDifference === 1) {
        visitMessageContainer.textContent = "Your last visit was 1 day ago.";
    } else {
        visitMessageContainer.textContent = `Your last visit was ${daysDifference} days ago.`;
    }
}

// Salva a visita atual no localStorage
localStorage.setItem('lastVisit-ms', currentVisit);