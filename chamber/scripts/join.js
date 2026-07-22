document.addEventListener("DOMContentLoaded", () => {
    // Set Timestamp Value
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // Open Modal Event Listeners
    const openButtons = document.querySelectorAll(".modal-open-btn");
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close Modal Event Listeners
    const closeButtons = document.querySelectorAll(".modal-close-btn");
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });
});

