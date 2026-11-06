
const membersContainer = document.querySelector("#members");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members.");
        }

        const members = await response.json();
        displayMembers(members);

    } catch (error) {
        membersContainer.textContent = "Unable to load members.";
        console.error(error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            <p>Membership Level: ${member.membershipLevel}</p>
        `;

        membersContainer.appendChild(card);
    });
}

document.querySelector("#grid").addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last modified: ${document.lastModified}`;

getMembers();
