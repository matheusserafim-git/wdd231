
const apiKey = '9ef3c63ad38c1a7b6e9ce1ece59269c8'; 
const lat = '-29.9181';
const lon = '-51.1781';

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
const membersUrl = 'data/members.json'; // Certifique-se de que o caminho corresponda ao seu arquivo JSON


document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    fetchChamberSpotlights();
});

// ==========================================================================
// 1. SEÇÃO DE CLIMA (Dados Reais + Previsão de 3 dias)
// ==========================================================================
async function fetchWeatherData() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Falha ao buscar dados meteorológicos');
        const data = await response.json();
        
        displayWeather(data);
    } catch (error) {
        console.error('Erro na seção de clima:', error);
        document.getElementById('weather-desc').textContent = 'Erro ao carregar clima.';
    }
}

function displayWeather(data) {
    // 1. Clima Atual (Pegando o primeiro elemento do array da lista)
    const current = data.list[0];
    const currentTemp = Math.round(current.main.temp);
    const description = current.weather[0].description;
    
    document.getElementById('current-temp').textContent = currentTemp;
    document.getElementById('weather-desc').textContent = capitalize(description);

    // 2. Previsão de 3 dias (Filtrando previsões próximas ao meio-dia dos próximos dias)
    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = ''; // Limpa o "Carregando..."

    // Agrupa e filtra para pegar um ponto de dados por dia subsequente (a cada 24h aproximadamente de intervalo ou índice de 8 em 8 se a API for de 3h)
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('pt-BR', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        const desc = day.weather[0].description;

        const li = document.createElement('li');
        li.innerHTML = `<strong>${capitalize(dayName)}:</strong> ${temp}°C, ${desc}`;
        forecastList.appendChild(li);
    });
}

// ==========================================================================
// 2. SEÇÃO DE DESTAQUES (Membros Gold/Silver Dinâmicos)
// ==========================================================================
async function fetchChamberSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error('Falha ao carregar lista de membros');
        const members = await response.json();
        
        // FILTRO ATUALIZADO: 3 = Gold, 2 = Silver
        const eligibleMembers = members.filter(m => 
            m && (m.membership === 3 || m.membership === 2)
        );

        if (eligibleMembers.length === 0) {
            document.getElementById('spotlight-container').innerHTML = '<p>Nenhum membro ouro ou prata encontrado.</p>';
            return;
        }

        // Selecionar aleatoriamente entre 2 ou 3 membros
        const count = Math.floor(Math.random() * 2) + 3; 
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedSpotlights = shuffled.slice(0, count);

        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error('Erro na seção de destaques:', error);
        document.getElementById('spotlight-container').innerHTML = '<p>Erro ao carregar destaques da empresa.</p>';
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = ''; 

    members.forEach(member => {
        // Converte o número para texto para exibir na Tag e na Classe CSS
        const levelText = member.membership === 3 ? 'Gold' : 'Silver';

        const card = document.createElement('div');
        card.className = `member-card spotlight-card spotlight-card--${levelText.toLowerCase()}`;
        
        card.innerHTML = `
            <div class="tag">⭐ Membro ${levelText}</div>
            <div class="member-header">
                <img src="${member.image}" alt="Logo da empresa ${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p class="spotlight-tagline"><em>${member.description}</em></p>
            </div>
            <div class="member-info">
                <p><span>Telefone:</span> ${member.phone}</p>
                <p><span>Site:</span> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace('https://', '')}</a></p>
            </div>
        `;
        container.appendChild(card);
    });
}
// Helper para formatar primeira letra maiúscula
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


