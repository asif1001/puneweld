// Array to store project data
const projects = [];

// Function to render projects on admin page
const renderProjects = () => {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    projects.forEach((project, index) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        projectItem.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <img src="${project.media}" alt="${project.name}" style="width: 100%; height: auto;">
            <button onclick="deleteProject(${index})">Remove</button>
        `;
        projectList.appendChild(projectItem);
    });

    // Sync projects with the current projects page
    syncProjects();
};

// Function to delete a project
const deleteProject = (index) => {
    projects.splice(index, 1);
    renderProjects();
};

// Function to sync projects with current-projects.html
const syncProjects = () => {
    const iframe = document.querySelector("iframe");
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ projects }, "*");
    }
};

// Event listener for the project form
document.addEventListener("DOMContentLoaded", () => {
    const projectForm = document.getElementById("project-form");

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("project-name").value;
        const description = document.getElementById("project-description").value;
        const media = document.getElementById("project-media").value;

        projects.push({ name, description, media });
        renderProjects();

        projectForm.reset();
    });
});

// Password protection
const checkPassword = () => {
    const password = document.getElementById("admin-password").value;
    if (password === "Asif@2811184") {
        document.getElementById("admin-content").style.display = "block";
        document.querySelector(".admin-login").style.display = "none";
    } else {
        alert("Incorrect password!");
    }
};
