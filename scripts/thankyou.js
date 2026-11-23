
// THANK YOU PAGE JAVASCRIPT

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

// GET FORM INFORMATION

const params = new URLSearchParams(window.location.search);

const applicationDetails = document.querySelector("#application-details");

// REQUIRED FORM FIELDS

const firstName = params.get("first") || "";
const lastName = params.get("last") || "";
const email = params.get("email") || "";
const phone = params.get("phone") || "";
const organization = params.get("organization") || "";
const timestamp = params.get("timestamp") || "";

// FORMAT TIMESTAMP

const date = new Date(timestamp);

const formattedDate = timestamp && !isNaN(date.getTime())
    ? date.toLocaleString()
    : "Not available";

// DISPLAY APPLICATION INFORMATION

if (
    firstName &&
    lastName &&
    email &&
    phone &&
    organization &&
    timestamp &&
    !isNaN(date.getTime())
) {

    const details = [
        ["First Name", firstName],
        ["Last Name", lastName],
        ["Email Address", email],
        ["Mobile Phone", phone],
        ["Business Name", organization],
        ["Application Date", formattedDate]
    ];

    applicationDetails.innerHTML = details.map(([label, value]) => {

        const safeValue = value.replace(/[&<>"']/g, (character) => {

            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[character];

        });

        return `
            <p>
                <strong>${label}:</strong>
                ${safeValue}
            </p>
        `;

    }).join("");

} else {

    applicationDetails.textContent =
        "No complete application information was found.";

}
