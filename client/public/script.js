// client/public/script.js
document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('main');

  // Function to load articles
  function loadArticle(date, category) {
    const jsonFile = `client/public/json/${date}${category}.json`;
    fetch(jsonFile)
      .then(response => response.json())
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
        mainElement.innerHTML += articleHTML;
      })
      .catch(error => console.error('Error loading article:', error));
  }

  // Example: Load articles for June 25, 2024
  const date = '240625';
  const categories = ['startups', 'mobile', 'medicine', 'education', 'robotics', 'reads', 'ai', 'cybersecurity', 'gaming', 'industry', 'reviews'];
  
  categories.forEach(category => {
    loadArticle(date, category);
  });
});
