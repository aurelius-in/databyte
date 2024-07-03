// client/public/archives.js
document.addEventListener('DOMContentLoaded', () => {
  const thumbsElement = document.getElementById('thumbs');
  const articlesElement = document.getElementById('articles');

  // Function to load thumbnails
  function loadThumbnails() {
    const thumbFiles = [
      '240625.png',
      // Add other thumbnail files here
    ];

    thumbFiles.forEach(file => {
      const thumbHTML = `
        <div class="thumb" data-date="${file.split('.')[0]}">
          <img src="client/public/images/thumbs/${file}" alt="Thumbnail ${file.split('.')[0]}">
          <p>${file.split('.')[0].replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3')}</p>
        </div>
      `;
      thumbsElement.innerHTML += thumbHTML;
    });

    // Add click event listeners to thumbnails
    document.querySelectorAll('.thumb').forEach(thumb => {
      thumb.addEventListener('click', event => {
        const date = event.currentTarget.getAttribute('data-date');
        loadArticles(date);
      });
    });
  }

  // Function to load articles based on date
  function loadArticles(date) {
    articlesElement.innerHTML = ''; // Clear current articles
    const categories = ['startups', 'mobile', 'medicine', 'education', 'robotics', 'reads', 'ai', 'cybersecurity', 'gaming', 'industry', 'reviews'];

    categories.forEach(category => {
      const jsonFile = `client/public/json/${date}${category}.json`;
      fetch(jsonFile)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Article not found');
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
        .catch(error => console.log(error));
    });
  }

  // Initial load of thumbnails
  loadThumbnails();
});
