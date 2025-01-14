// Firebase configuration (replace with your Firebase project details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

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

// Add project to Firestore
const projectForm = document.getElementById("project-form");
projectForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("project-name").value;
    const description = document.getElementById("project-description").value;
    const media = document.getElementById("project-media").value;

    try {
        await db.collection("projects").add({ name, description, media });
        alert("Project added successfully!");
        projectForm.reset();
        loadProjects();
    } catch (error) {
        console.error("Error adding project: ", error);
    }
});

// Load projects for admin view
const loadProjects = async () => {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    try {
        const snapshot = await db.collection("projects").get();
        snapshot.forEach((doc) => {
            const project = doc.data();
            const projectItem = document.createElement("div");
            projectItem.classList.add("project-item");
            projectItem.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <img src="${project.media}" alt="${project.name}" style="width: 100%; height: auto;">
            `;
            projectList.appendChild(projectItem);
        });
    } catch (error) {
        console.error("Error loading projects: ", error);
    }
};

// Load projects on page load
document.addEventListener("DOMContentLoaded", loadProjects);
