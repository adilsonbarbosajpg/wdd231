
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    }
];


function displayCourses(courseList) {
    const container = document.querySelector("#courseContainer");

    container.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
            <p>${course.completed ? "✓ Completed" : "Not Completed"}</p>
        `;

        container.appendChild(card);
    });

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    document.querySelector("#credits").textContent =
        `Total Credits: ${totalCredits}`;
}


document.querySelector("#allCourses").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wddCourses").addEventListener("click", () => {
    const wdd = courses.filter(course => course.subject === "WDD");
    displayCourses(wdd);
});

document.querySelector("#cseCourses").addEventListener("click", () => {
    const cse = courses.filter(course => course.subject === "CSE");
    displayCourses(cse);
});


displayCourses(courses);
