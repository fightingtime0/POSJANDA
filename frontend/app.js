document.addEventListener('DOMContentLoaded', function () {
    const userListElement = document.getElementById('user-list');
    const createUserForm = document.getElementById('create-user-form');

    // Fetch users from the backend when the page loads
    fetch('https://your-backend-api.herokuapp.com/users')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                userListElement.innerHTML = '<li>No users found.</li>';
            } else {
                userListElement.innerHTML = '';  // Clear loading text
                data.forEach(user => {
                    const userItem = document.createElement('li');
                    userItem.textContent = `${user.username} - ${user.email}`;
                    userListElement.appendChild(userItem);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            userListElement.innerHTML = '<li>Failed to load users.</li>';
        });

    // Handle form submission to create a new user
    createUserForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const newUser = {
            username: username,
            email: email,
            password: password
        };

        fetch('https://your-backend-api.herokuapp.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(response => {
                if (response.ok) {
                    alert('User created successfully');
                    createUserForm.reset();  // Reset form
                    // Refresh user list
                    window.location.reload();
                } else {
                    alert('Error creating user');
                }
            })
            .catch(error => {
                console.error('Error creating user:', error);
                alert('Error creating user');
            });
    });
});
