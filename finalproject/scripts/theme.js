import { saveItem, getItem } from "./storage.js";

const button = document.querySelector("#themeButton");

const savedTheme = getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    button.textContent = "☀️";

}

button.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    if (isDark) {

        saveItem("theme","dark");

        button.textContent = "☀️";

    } else {

        saveItem("theme","light");

        button.textContent = "🌙";

    }

});