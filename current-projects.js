// Firebase configuration (same as admin.js)
const firebaseConfig = {
  apiKey: "AIzaSyDX5b76aFeJGslHt3FknWoV0zOHARY6Kyw",
  authDomain: "puneweld-9ff85.firebaseapp.com",
  projectId: "puneweld-9ff85",
  storageBucket: "puneweld-9ff85.firebasestorage.app",
  messagingSenderId: "3058063972",
  appId: "1:3058063972:web:6cc492e15b4c1eb8f61d71",
  measurementId: "G-F06ZQ1HDYM"
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
