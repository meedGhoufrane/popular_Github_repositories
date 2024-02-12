function handleSearchInput() {
    const searchTerm = document.getElementById('searchInput').value;
    searchRepositories(searchTerm);
}

async function searchRepositories(searchTerm) {
    let apiUrl;
    let page = 1;
    const itemsPerPage = 10;
    
    


    

    if (searchTerm !== '') {
        apiUrl = `https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc&page=${page}&per_page=${itemsPerPage}`;
    } else {
        apiUrl = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${itemsPerPage}`;
    }
    

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderRepositories(data.items);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

function renderRepositories(repos) {
    const repoList = document.getElementById('repoList');
    repoList.innerHTML = ''; 

    repos.forEach(repo => {
        const li = document.createElement('li');
        li.classList.add('repo-item');
        
        const repoContainer = document.createElement('div');
        repoContainer.classList.add('repo-container');
        
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image-container');
        imageDiv.innerHTML = `<img src="${repo.owner.avatar_url}" alt="${repo.owner.login}'s avatar">`;
        
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details-container');
        detailsDiv.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description}</p>
            <p>Stars: ${repo.stargazers_count}</p>
            <p>Forks: ${repo.forks_count}</p>
            <p>Owner: ${repo.owner.login}</p>
        `;
        
        repoContainer.appendChild(imageDiv);
        repoContainer.appendChild(detailsDiv);
        
        li.appendChild(repoContainer);
        repoList.appendChild(li);
    });
}
