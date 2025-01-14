// Firebase configuration (same as admin.js)
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

// Load projects from Firestore
const loadProjects = async () => {
    const projectGallery = document.getElementById("project-gallery");
    projectGallery.innerHTML = "";

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
            projectGallery.appendChild(projectItem);
        });
    } catch (error) {
        console.error("Error loading projects: ", error);
    }
};

// Load projects on page load
document.addEventListener("DOMContentLoaded", loadProjects);
