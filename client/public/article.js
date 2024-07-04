// client/public/article.js
document.addEventListener('DOMContentLoaded', () => {
  const articlesElement = document.getElementById('articles');

  // Function to get URL parameter
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Function to convert date format
  function formatDate(dateStr) {
    const year = `20${dateStr.slice(0, 2)}`;
    const month = dateStr.slice(2, 4) - 1; // Adjust month to be 0-indexed
    const day = dateStr.slice(4, 6);
    const date = new Date(year, month, day);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Function to load articles based on date
  function loadArticles(date) {
    const categories = ['startups', 'mobile', 'medicine', 'education', 'robotics', 'reads', 'ai', 'cybersecurity', 'gaming', 'industry', 'reviews'];

    categories.forEach(category => {
      const jsonFile = `client/public/json/${date}${category}.json`;
      fetch(jsonFile)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Article not found: ' + jsonFile);
        })
        .then(data => {
          const formattedDate = formatDate(date);
          const articleHTML = `
            <article>
              <header>
                <img src="client/public/images/headers/${category}.png" alt="${category} header">
                <h2>${data.title}</h2>
                <p class="article-author">${data.author}</p>
                <p class="article-date">${formattedDate}</p>
              </header>
              <img src="client/public/images/articles/${data.image}" alt="${category} article photo">
              <p>${data.content}</p>
            </article>
          `;
          articlesElement.innerHTML += articleHTML;
        })
        .catch(error => console.error('Error loading article:', error));
    });
  }

  // Get date from URL and load articles
  const date = getUrlParameter('date');
  if (date) {
    loadArticles(date);
  } else {
    console.error('No date parameter found in URL');
  }
});
