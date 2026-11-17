
// HOME PAGE JAVASCRIPT

// ================================
// MENU NAVIGATION
// ================================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});


// ================================
// FOOTER
// ================================

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;


// ================================
// WEATHER API
// ================================

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

const latitude = -30.89;
const longitude = -55.53;

const currentWeather = document.querySelector("#current-weather");
const weatherForecast = document.querySelector("#weather-forecast");


async function getWeather() {

    const currentURL =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    try {

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentURL),
            fetch(forecastURL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        // CURRENT WEATHER

        currentWeather.innerHTML = `
            <p>
                <strong>Temperature:</strong>
                ${Math.round(currentData.main.temp)}&deg;C
            </p>

            <p>
                <strong>Description:</strong>
                ${currentData.weather[0].description}
            </p>
        `;


        // THREE DAY FORECAST

        const cityOffset = forecastData.city.timezone;

        const cityToday = new Date(
            (Date.now() / 1000 + cityOffset) * 1000
        ).toISOString().slice(0, 10);

        const dailyForecast = {};

        forecastData.list.forEach(item => {

            const localDate = new Date(
                (item.dt + cityOffset) * 1000
            ).toISOString().slice(0, 10);

            if (localDate > cityToday) {

                if (!dailyForecast[localDate]) {
                    dailyForecast[localDate] = [];
                }

                dailyForecast[localDate].push(item);
            }

        });


        const nextThreeDays = Object.keys(dailyForecast)
            .sort()
            .slice(0, 3);

        weatherForecast.innerHTML = "";


        nextThreeDays.forEach(date => {

            const forecasts = dailyForecast[date];

            // Find forecast closest to noon

            const middayForecast = forecasts.reduce((closest, item) => {

                const itemHour = Number(
                    item.dt_txt.split(" ")[1].slice(0, 2)
                );

                const closestHour = Number(
                    closest.dt_txt.split(" ")[1].slice(0, 2)
                );

                return Math.abs(itemHour - 12) <
                    Math.abs(closestHour - 12) ? item : closest;

            });

            const dayName = new Date(`${date}T12:00:00Z`)
                .toLocaleDateString("en-US", {
                    weekday: "long",
                    timeZone: "UTC"
                });

            const forecastCard = document.createElement("div");

            forecastCard.innerHTML = `
                <p><strong>${dayName}</strong></p>

                <p>
                    ${Math.round(middayForecast.main.temp)}&deg;C
                </p>

                <p>
                    ${middayForecast.weather[0].description}
                </p>
            `;

            weatherForecast.appendChild(forecastCard);

        });

        if (nextThreeDays.length === 0) {
            weatherForecast.textContent =
                "Forecast information unavailable.";
        }

    } catch (error) {

        currentWeather.textContent =
            "Weather information unavailable.";

        weatherForecast.textContent =
            "Forecast unavailable.";

        console.error("Weather error:", error);

    }

}

getWeather();


// ================================
// BUSINESS SPOTLIGHTS
// ================================

const spotlightContainer =
    document.querySelector("#spotlight-container");


async function getSpotlights() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Members data could not be loaded.");
        }

        const members = await response.json();


        // FILTER GOLD AND SILVER MEMBERS

        const eligibleMembers = members.filter(member =>
            member.membershipLevel === 2 ||
            member.membershipLevel === 3
        );


        // RANDOMIZE MEMBERS

        eligibleMembers.sort(() => Math.random() - 0.5);


        // SELECT TWO OR THREE MEMBERS

        const numberOfSpotlights = Math.min(
            eligibleMembers.length,
            Math.floor(Math.random() * 2) + 2
        );

        const selectedMembers =
            eligibleMembers.slice(0, numberOfSpotlights);


        // DISPLAY SPOTLIGHT CARDS

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {

            const membership =
                member.membershipLevel === 3 ? "Gold" : "Silver";

            const card = document.createElement("div");

            card.classList.add("spotlight-card");

            card.innerHTML = `

                <h3>${member.name}</h3>

                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                >

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${membership}
                </p>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>

            `;

            spotlightContainer.appendChild(card);

        });

    } catch (error) {

        spotlightContainer.textContent =
            "Business spotlights could not be loaded.";

        console.error("Spotlight error:", error);

    }

}

getSpotlights();
