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

  // Function to load articles based on date
  function loadArticles(date) {
    const categories = ['startups', 'mobile', 'medicine', 'education', 'robotics', 'reads', 'ai', 'cybersecurity', 'gaming', 'industry', 'reviews'];

    categories.forEach(category => {
      const jsonFile = `client/public/json/${date}${category}.json`;
      console.log('Fetching:', jsonFile); // Debugging statement
      fetch(jsonFile)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Article not found: ' + jsonFile);
        })
        .then(data => {
          const articleHTML = `
            <article>
              <header>
                <img src="client/public/images/headers/${category}.png" alt="${category} header">
                <h2>${data.title}</h2>
                <p>By ${data.author}</p>
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
