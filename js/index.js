// Step 1: Handle form submission
document.getElementById('search-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Stop the form from refreshing the page
  
    const username = document.getElementById('search-input').value.trim(); // Get the search input
    if (!username) return; // Exit if the input is empty
  
    // Step 2: Fetch users from GitHub
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}`);
      const data = await response.json(); // Convert response to JSON
      displayUsers(data.items); // Display the users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  });
  
  // Step 3: Display the list of users
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous results
  
    if (users.length === 0) {
      userList.innerHTML = '<p>No users found.</p>'; // Show message if no users are found
      return;
    }
  
    // Loop through each user and create a div for them
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'user';
      userDiv.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50">
        <h3>${user.login}</h3>
      `;
  
      // Step 4: Add a click event to fetch repositories when a user is clicked
      userDiv.addEventListener('click', () => fetchRepositories(user.login));
      userList.appendChild(userDiv); // Add the user to the list
    });
  }
  
  // Step 5: Fetch repositories for a specific user
  async function fetchRepositories(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await response.json(); // Convert response to JSON
      displayRepositories(repos); // Display the repositories
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  }
  
  // Step 6: Display the list of repositories
  function displayRepositories(repos) {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '<h2>Repositories:</h2>'; // Clear previous results and add a heading
  
    if (repos.length === 0) {
      repoList.innerHTML += '<p>No repositories found.</p>'; // Show message if no repos are found
      return;
    }
  
    // Loop through each repository and create a div for it
    repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.className = 'repo';
      repoDiv.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description available.'}</p>
      `;
      repoList.appendChild(repoDiv); // Add the repository to the list
    });
  }