// Sample Data (For simplicity, stored in JSON-like format)
// Replace this with actual data from your backend.
const projects = [
    { id: 1, title: "Project 1", description: "Description of Project 1", fileUrl: "project1.zip", comments: [] },
    { id: 2, title: "Project 2", description: "Description of Project 2", fileUrl: "project2.zip", comments: [] }
  ];
  
  // Simulated user data (Replace with actual user authentication mechanism).
  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user1", password: "user123", role: "user" }
  ];
  
  let loggedInUser = null;
  
  // Show or hide admin features based on logged-in user
  const adminFeatures = document.getElementById('admin-dashboard');
  if (loggedInUser && loggedInUser.role === 'admin') {
    adminFeatures.style.display = 'block';
  } else {
    adminFeatures.style.display = 'none';
  }
  
  // Display Projects on Projects Page
  const projectListContainer = document.getElementById('project-list');
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <button onclick="downloadProject(${project.id})">Download</button>
      <textarea placeholder="Add a comment"></textarea>
      <button onclick="submitComment(${project.id})">Comment</button>
      <div id="comments-${project.id}">
        ${project.comments.map(comment => `<p>${comment}</p>`).join('')}
      </div>
    `;
    projectListContainer.appendChild(projectCard);
  });
  
  // Handle Comment Submission
  function submitComment(projectId) {
    const project = projects.find(p => p.id === projectId);
    const commentText = document.querySelector(`#project-${projectId} textarea`).value;
    if (commentText) {
      project.comments.push(commentText);
      renderComments(projectId);
    }
  }
  
  // Render Comments
  function renderComments(projectId) {
    const project = projects.find(p => p.id === projectId);
    const commentsContainer = document.getElementById(`comments-${projectId}`);
    commentsContainer.innerHTML = project.comments.map(comment => `<p>${comment}</p>`).join('');
  }
  
  // Handle Project Download
  function downloadProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    // Logic to handle project download (e.g., open the file URL)
    window.location.href = project.fileUrl;
  }
  
  // Admin Upload (Visible only to the admin)
  document.getElementById('upload-project').addEventListener('click', function() {
    if (loggedInUser && loggedInUser.role === 'admin') {
      alert('Upload Project functionality not yet implemented.');
    } else {
      alert('You must be logged in as an admin to upload projects.');
    }
  });
  
  // Admin Dashboard (View Projects, Edit, Delete Projects)
  function renderAdminDashboard() {
    const projectsListAdmin = document.getElementById('projects-list-admin');
    if (loggedInUser && loggedInUser.role === 'admin') {
      projectsListAdmin.innerHTML = `
        <h3>Manage Projects</h3>
        <ul>
          ${projects.map(project => `
            <li>
              ${project.title} 
              <button onclick="deleteProject(${project.id})">Delete</button>
              <button onclick="editProject(${project.id})">Edit</button>
            </li>
          `).join('')}
        </ul>
      `;
    }
  }
  
  // Admin: Delete Project
  function deleteProject(projectId) {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
      projects.splice(projectIndex, 1);
      alert('Project deleted successfully.');
      renderAdminDashboard();  // Refresh the project list
    }
  }
  
  // Admin: Edit Project (To implement edit functionality)
  function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    const newTitle = prompt('Enter new project title:', project.title);
    if (newTitle) {
      project.title = newTitle;
      alert('Project updated successfully.');
      renderAdminDashboard();  // Refresh the project list
    }
  }
  
  // User Registration and Login
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      loggedInUser = user;
      alert('Login successful!');
      document.location.href = 'projects.html'; // Redirect to projects page after successful login
    } else {
      alert('Invalid credentials');
    }
  });
  
  // Logout Functionality (Admin & User)
  function logout() {
    loggedInUser = null;
    alert('You have logged out.');
    document.location.href = 'index.html'; // Redirect to homepage after logout
  }
  
  // Check login status on the projects page
  if (loggedInUser && loggedInUser.role === 'admin') {
    renderAdminDashboard(); // Show admin controls
  }
  
  