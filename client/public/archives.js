// client/public/archives.js
document.addEventListener('DOMContentLoaded', () => {
  const thumbsElement = document.getElementById('thumbs');

  // Function to convert date format
  function formatDate(dateStr) {
    const year = `20${dateStr.slice(0, 2)}`;
    const month = dateStr.slice(2, 4) - 1; // Adjust month to be 0-indexed
    const day = dateStr.slice(4, 6);
    const date = new Date(year, month, day);
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Function to load thumbnails from issues.json
  function loadThumbnails() {
    fetch('client/public/json/issues.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(date => {
          const formattedDate = formatDate(date);
          const thumbHTML = `
            <div class="thumb" data-date="${date}">
              <img src="client/public/images/thumbs/${date}.png" alt="Thumbnail ${formattedDate}">
              <p>${formattedDate}</p>
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
