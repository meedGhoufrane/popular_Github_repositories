document.addEventListener('DOMContentLoaded', async () => {
  var repoList = document.getElementById('repoList');
  var paginationContainer = document.getElementById('pagination');
  var currentPageSpan = document.getElementById('currentPage');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  let page = 1;
  var itemsPerPage = 10; 
  let totalPages = 0;

  var fetchRepos = async (page, perPage) => {
      try {
          var response = await fetch(`https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${perPage}`);
          var data = await response.json();
          return data.items;
      } catch (error) {
          console.error('Error fetching repositories:', error);
      }
  };

  var renderRepo = (repo) => {
      var li = document.createElement('li');
      li.classList.add('repo-item');
      
      var repoContainer = document.createElement('div');
      repoContainer.classList.add('repo-container');
      
      var imageDiv = document.createElement('div');
      imageDiv.classList.add('image-container');
      imageDiv.innerHTML = `<img src="${repo.owner.avatar_url}" alt="${repo.owner.login}'s avatar">`;
      
      var detailsDiv = document.createElement('div');
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

  var renderPagination = () => {
      currentPageSpan.textContent = `Page ${page} of ${totalPages}`;
  };

  var nextPage = async () => {
      if (page < totalPages) {
          page++;
          await renderRepos();
      }
  };

  var prevPage = async () => {
      if (page > 1) {
          page--;
          await renderRepos();
      }
  };

  var renderRepos = async () => {
      repoList.innerHTML = ''; 
      var repos = await fetchRepos(page, itemsPerPage);
      repos.forEach(renderRepo);
      renderPagination();
  };

  var totalCountResponse = await fetch(`https://api.github.com/search/repositories?q=stars:>1`);
  var totalCountData = await totalCountResponse.json();
  var totalCount = totalCountData.total_count;
  totalPages = Math.ceil(totalCount / itemsPerPage);

  await renderRepos();

  nextBtn.addEventListener('click', nextPage);
  prevBtn.addEventListener('click', prevPage);
});
