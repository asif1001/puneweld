// Firebase configuration (replace with your Firebase project details)
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

// Password protection
const checkPassword = () => {
  const password = document.getElementById("admin-password").value;

  // Check if the entered password matches the correct password
  if (password === "Asif@28111984") {
    // Show admin content and hide login form
    document.getElementById("admin-content").style.display = "block";
    document.querySelector(".admin-login").style.display = "none";
  } else {
    // Display incorrect password message
    alert("Incorrect password! Please try again.");
  }
};

// Add project to Firestore
const projectForm = document.getElementById("project-form");
projectForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Retrieve form data
  const name = document.getElementById("project-name").value;
  const description = document.getElementById("project-description").value;
  const media = document.getElementById("project-media").value;

  try {
    // Add the project to Firestore
    await db.collection("projects").add({
      name,
      description,
      media
    });

    // Show success message
    alert("Project added successfully!");

    // Reset the form
    projectForm.reset();

    // Reload the project list
    loadProjects();
  } catch (error) {
    console.error("Error adding project:", error);
  }
});

// Load projects from Firestore for admin view
const loadProjects = async () => {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = ""; // Clear the current list

  try {
    // Fetch projects from Firestore
    const snapshot = await db.collection("projects").get();

    snapshot.forEach((doc) => {
      const project = doc.data();

      // Create project item
      const projectItem = document.createElement("div");
      projectItem.classList.add("project-item");
      projectItem.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <img src="${project.media}" alt="${project.name}" style="width: 100%; height: auto;">
        <button onclick="deleteProject('${doc.id}')">Remove</button>
      `;

      // Append to the project list
      projectList.appendChild(projectItem);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
};

// Delete project from Firestore
const deleteProject = async (id) => {
  try {
    // Remove project document from Firestore
    await db.collection("projects").doc(id).delete();

    // Show success message
    alert("Project removed successfully!");

    // Reload the project list
    loadProjects();
  } catch (error) {
    console.error("Error removing project:", error);
  }
};

// Load projects on page load
document.addEventListener("DOMContentLoaded", loadProjects);
