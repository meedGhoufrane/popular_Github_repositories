document.addEventListener('DOMContentLoaded', async () => {
    const repoList = document.getElementById('repoList');
    const paginationContainer = document.getElementById('pagination');
    const currentPageSpan = document.getElementById('currentPage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let page = 1;
    const itemsPerPage = 10; 
    let totalPages = 0;
  
    const fetchRepos = async (page, perPage) => {
      try {
        const response = await fetch(`https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${perPage}`);
        const data = await response.json();
        return data.items;
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };
  
    const renderRepo = (repo) => {
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
      };
      
  
    const renderPagination = () => {
      currentPageSpan.textContent = `Page ${page} of ${totalPages}`;
    };
  
    const nextPage = async () => {
      if (page < totalPages) {
        page++;
        await renderRepos();
      }
    };
  
    const prevPage = async () => {
      if (page > 1) {
        page--;
        await renderRepos();
      }
    };
  
    const renderRepos = async () => {
      repoList.innerHTML = ''; 
      const repos = await fetchRepos(page, itemsPerPage);
      repos.forEach(renderRepo);
      renderPagination();
    };
  
 
    const totalCountResponse = await fetch(`https://api.github.com/search/repositories?q=stars:>1`);
    const totalCountData = await totalCountResponse.json();
    const totalCount = totalCountData.total_count;
    totalPages = Math.ceil(totalCount / itemsPerPage);
  
    
    await renderRepos();
  
   
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);
  });
  