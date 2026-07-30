import {items} from '../data/items.mjs';

const container = document.getElementById('discover-container');

function displayItems(data) {
    container.innerHTML = '';
    
    // Adicionamos o 'index' (posição) no forEach
    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('discover-card');

        // Se for um dos 3 primeiros cartões (índice 0, 1 ou 2), carrega imediatamente (eager). 
        // Do cartão 4 em diante (índice 3+), carrega com preguiça (lazy) para salvar performance.
        const lazyAttribute = index < 3 ? 'loading="eager"' : 'loading="lazy"';

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.photo}" alt="${item.name}" ${lazyAttribute} width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        container.appendChild(card);
    });
}

// Chama a função para exibir os itens
displayItems(items);


// Lógica do localStorage para visitas (Requisito 11)
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