import "./menu.js";

const form = document.querySelector(".contact-form");

form.addEventListener("submit", () => {

    localStorage.setItem(
        "contactName",
        document.querySelector("#fullname").value
    );

    localStorage.setItem(
        "contactEmail",
        document.querySelector("#email").value
    );

});