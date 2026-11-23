
// JOIN PAGE JAVASCRIPT

// NAVIGATION MENU

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);

    });

}

// FOOTER

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// TIMESTAMP

const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// OPEN MEMBERSHIP MODALS

const modalButtons = document.querySelectorAll(".modal-button");

modalButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }

    });

});

// CLOSE MEMBERSHIP MODALS

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }

    });

});

// CLOSE MODAL WHEN CLICKING OUTSIDE

const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) => {

    dialog.addEventListener("click", (event) => {

        if (event.target === dialog) {
            dialog.close();
        }

    });

});
