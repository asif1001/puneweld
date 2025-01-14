document.addEventListener("DOMContentLoaded", () => {
    const projectForm = document.getElementById("project-form");
    const projectList = document.getElementById("project-list");

    const renderProjects = () => {
        const projects = projectList.innerHTML;
        const projectPage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Projects - Puneweld Enterprises</title>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <header>
                    <div class="container">
                        <img src="https://res.cloudinary.com/dsnen7cvr/image/upload/v1736688765/Puneweld-product/Newlogo1_prev_ui_kaiw8g.png" alt="Puneweld Logo" class="logo">
                        <nav>
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li><a href="service.html">Services</a></li>
                                <li><a href="current-projects.html">Current Projects</a></li>
                                <li><a href="contact.html">Contact Us</a></li>
                                <li><a href="admin.html">Admin</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <section class="hero">
                        <h1>All Projects</h1>
                    </section>
                    <section id="project-gallery">
                        ${projects || "<p>No projects added yet.</p>"}
                    </section>
                </main>
                <footer>
                    <p>&copy; 2025 Puneweld Enterprises. All rights reserved.</p>
                </footer>
            </body>
            </html>
        `;

        const blob = new Blob([projectPage], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "project.html";
        link.click();
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
            <img src="${media}" alt="${name}" style="width: 100%; height: auto;">
            <button onclick="this.parentElement.remove(); renderProjects();">Remove</button>
        `;

        projectList.appendChild(project);
        renderProjects();

        projectForm.reset();
    });

    window.checkPassword = () => {
        const password = document.getElementById("admin-password").value;
        if (password === "Asif@2811184") {
            document.getElementById("admin-content").style.display = "block";
            document.querySelector(".admin-login").style.display = "none";
        } else {
            alert("Incorrect password!");
        }
    };
});
