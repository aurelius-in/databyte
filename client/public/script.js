// client/public/script.js

document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('main');

  // Function to load articles
  function loadArticles(date) {
    // Clear the current articles
    mainElement.innerHTML = '';

    // Define categories to look for
    const categories = ['startups', 'mobile', 'medicine', 'education', 'robotics', 'reads', 'ai', 'cybersecurity', 'gaming', 'industry', 'reviews'];

    // Fetch and display articles for each category that match the date
    categories.forEach(category => {
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
    });
  }

  // Add event listeners to thumbnails in the archives page
  const thumbElements = document.querySelectorAll('.thumb img');
  thumbElements.forEach(thumb => {
    thumb.addEventListener('click', (event) => {
      const date = event.target.src.split('/').pop().slice(0, 6); // Extract date from filename
      loadArticles(date);
    });
  });

  // Example: Load articles for a specific date on initial page load if desired
  // const date = '240625';
  // loadArticles(date);
});
