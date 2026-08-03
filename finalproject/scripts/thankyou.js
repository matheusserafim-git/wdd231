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