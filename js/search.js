

function handleSearchInput() {
    var searchTerm = document.getElementById('searchInput').value;
    console.log(searchTerm);
    searchRepositories(searchTerm);
}




function searchRepositories(searchTerm) {
    if (searchTerm !== '') {
        // Reset page number for new search
        page = 1; 
        apiUrl = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${searchTerm}`;
 
        fetchRepositories();
    } else {
        // if search input is empty we will back to the initial status
        // Reset page number for new search
        page = 1; 
        apiUrl = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${searchTerm}`;
        mainContainer.innerHTML = ''; 
        fetchRepositories(); 
    }
}
