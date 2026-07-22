document.addEventListener("DOMContentLoaded", () => {
    // Obter a URL atual e extrair os parâmetros GET
    const currentUrl = window.location.href;
    const formData = new URLSearchParams(window.location.search);

    const resultsContainer = document.getElementById("results");

    // Função para obter e limpar o valor dos parâmetros
    function getParam(key) {
        return formData.get(key) || "N/A";
    }

    // Formatação da data/hora do timestamp
    function formatTimestamp(rawTimestamp) {
        if (!rawTimestamp || rawTimestamp === "N/A") return "N/A";
        const dateObj = new Date(rawTimestamp);
        return isNaN(dateObj.getTime()) 
            ? rawTimestamp 
            : dateObj.toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "medium"
            });
    }

    // Montar o HTML para os campos OBRIGATÓRIOS exigidos pela especificação
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <p><strong>First Name:</strong> ${getParam("fname")}</p>
            <p><strong>Last Name:</strong> ${getParam("lname")}</p>
            <p><strong>Email:</strong> <a href="mailto:${getParam("email")}">${getParam("email")}</a></p>
            <p><strong>Mobile Number:</strong> ${getParam("phone")}</p>
            <p><strong>Business/Organization:</strong> ${getParam("organization")}</p>
            <p><strong>Application Date & Time:</strong> ${formatTimestamp(getParam("timestamp"))}</p>
        `;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // ... seu código existente para ler os parâmetros ...

    // Função para lançar confetes das duas pontas da tela
    function launchConfetti() {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }

    // Executa a animação de confete ao abrir a página
    launchConfetti();
});