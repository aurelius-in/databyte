// client/public/archives.js
document.addEventListener('DOMContentLoaded', () => {
  const thumbsElement = document.getElementById('thumbs');

  // Function to load thumbnails from issues.json
  function loadThumbnails() {
    fetch('client/public/json/issues.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(date => {
          const thumbHTML = `
            <div class="thumb" data-date="${date}">
              <img src="client/public/images/thumbs/${date}.png" alt="Thumbnail ${date}">
              <p>${date.replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3')}</p>
            </div>
          `;
          thumbsElement.innerHTML += thumbHTML;
        });

        // Add click event listeners to thumbnails
        document.querySelectorAll('.thumb').forEach(thumb => {
          thumb.addEventListener('click', event => {
            const date = event.currentTarget.getAttribute('data-date');
            window.location.href = `article.html?date=${date}`;
          });
        });
      })
      .catch(error => console.error('Error loading thumbnails:', error));
  }

  // Initial load of thumbnails
  loadThumbnails();
});
