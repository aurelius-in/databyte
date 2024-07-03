// client/public/script.js

// Helper function to convert filename to readable date format
const convertFilenameToDate = (filename) => {
  const year = `20${filename.slice(0, 2)}`;
  const month = filename.slice(2, 4);
  const day = filename.slice(4, 6);
  const date = new Date(year, month - 1, day);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

// Generate the list of images from 240704.png back to 240204.png with dates on the 4th, 11th, 18th, and 25th of each month
const generateImageList = () => {
  const images = [];
  const startDate = new Date(2024, 6, 4); // July 4, 2024
  const endDate = new Date(2024, 1, 4); // February 4, 2024

  let currentDate = startDate;
  while (currentDate >= endDate) {
    const year = currentDate.getFullYear().toString().slice(2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const days = [4, 11, 18, 25];

    days.forEach((day) => {
      const dateStr = `${year}${month}${day.toString().padStart(2, '0')}.png`;
      images.push(dateStr);
    });

    // Move to the previous month
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  return images;
};

const images = generateImageList().reverse();

const archivesDiv = document.getElementById('archives');

images.forEach((image) => {
  const thumbDiv = document.createElement('div');
  thumbDiv.className = 'thumb';

  const img = document.createElement('img');
  img.src = `client/public/images/thumbs/${image}`;
  img.alt = `Issue ${image}`;

  const dateP = document.createElement('p');
  dateP.textContent = convertFilenameToDate(image);

  thumbDiv.appendChild(img);
  thumbDiv.appendChild(dateP);

  archivesDiv.appendChild(thumbDiv);
});
