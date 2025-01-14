document.addEventListener("DOMContentLoaded", () => {
    const projectForm = document.getElementById("project-form");
    const projectList = document.getElementById("project-list");
    const currentProjectList = document.getElementById("current-project-list");

    const renderProjects = () => {
        currentProjectList.innerHTML = projectList.innerHTML;
    };

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("project-name").value;
        const description = document.getElementById("project-description").value;
        const media = document.getElementById("project-media").value;

        const project = document.createElement("div");
        project.classList.add("project-item");
        project.innerHTML = `
            <h3>${name}</h3>
            <p>${description}</p>
            <div>
                <img src="${media}" alt="${name}" style="max-width: 100%; height: auto;">
            </div>
            <button onclick="removeProject(this)">Remove</button>
        `;

        projectList.appendChild(project);
        renderProjects();

        projectForm.reset();
    });

    window.removeProject = (button) => {
        const project = button.parentElement;
        project.remove();
        renderProjects();
    };
});

const checkPassword = () => {
    const password = document.getElementById("admin-password").value;
    if (password === "Asif@28111984") {
        document.getElementById("admin-content").style.display = "block";
        document.querySelector(".admin-login").style.display = "none";
    } else {
        alert("Incorrect password!");
    }
};
