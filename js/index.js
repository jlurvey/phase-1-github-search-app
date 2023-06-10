document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search').value;

        // clear previous results
        userList.innerHTML = ''
        reposList.innerHTML = ''

        searchUsers(searchInput);
    });

    function searchUsers(username) {
        const searchUrl = `https://api.github.com/search/users?q=${username}`;
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
        };

        fetch(searchUrl, {headers})
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                displayUsers(data.items);
            } else {
                console.error('No users found.');
            }
        })
        .catch(error => {
            console.error('searchUsers Error', error);
        });
    }

    function displayUsers(users) {
        users.forEach(user => {
            const userItem = document.createElement('li');
            const userLink = document.createElement('a');
            userLink.href = user.html_url;
            userLink.target = '_blank';
            userLink.innerText = user.login;

            userItem.appendChild(userLink);
            userList.appendChild(userItem);

            userLink.addEventListener('click', () => {
                getUserRepos(user.login);
            });
        });
    }

    function getUserRepos(username) {
        const reposUrl = `https://api.github.com/users/${username}/repos`;
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
        };
        fetch(reposUrl, {headers})
        .then(response => response.json())
        .then(data => {
            displayRepos(data);
        }).catch(error => {
            console.error('getUserRepos Error:', error);
        });
    }


    function displayRepos(repos) {
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.target = '_blank';
            repoLink.innerText = repo.name;

            repoItem.appendChild(repoLink);
            reposList.appendChild(repoItem);
        });
    }
});
