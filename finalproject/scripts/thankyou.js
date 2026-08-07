import "./menu.js";
import "./theme.js";

const params = new URLSearchParams(window.location.search);

const container = document.querySelector("#formData");

const name = params.get("fullname");
const email = params.get("email");
const subject = params.get("subject");
const message = params.get("message");

container.innerHTML = `

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Subject:</strong> ${subject}</p>

    <p><strong>Message:</strong> ${message}</p>

`;
// Aguarda a página carregar completamente
window.addEventListener("load", () => {
    
    // Dispara a animação dos confetes
    confetti({
        particleCount: 150,  // Quantidade de confetes (pode aumentar se quiser mais)
        spread: 80,          // O quão espalhados eles vão ficar
        origin: { y: 0.6 },  // Começa do meio da tela para baixo
        colors: ['#2563eb', '#f59e0b', '#10b981', '#ffffff'] // As cores do seu site (Azul, Laranja, Verde, Branco)
    });

    // Opcional: Recupera o nome do contato salvo no localStorage (caso você queira exibir)
    const name = localStorage.getItem("contactName");
    if (name) {
        const nameElement = document.querySelector("#userName");
        if (nameElement) {
            nameElement.textContent = name;
        }
    }
});