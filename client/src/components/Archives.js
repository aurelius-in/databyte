// client/src/components/Archives.js
import React from 'react';

// Helper function to convert filename to readable date format
const convertFilenameToDate = (filename) => {
  const year = `20${filename.slice(0, 2)}`;
  const month = filename.slice(2, 4);
  const day = filename.slice(4, 6);
  const date = new Date(year, month - 1, day);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const Archives = () => {
  const images = [
        '240211.png',
        '240204.png',
        '240325.png',
        '240318.png',
        '240311.png',
        '240304.png',
        '240425.png',
        '240418.png',
        '240411.png',
        '240404.png',
        '240525.png',
        '240518.png',
        '240511.png',
        '240504.png',
        '240625.png',
        '240618.png',
        '240611.png',
        '240604.png',
    '240704.png',
    '240711.png',
    '240718.png',
    '240725.png',
  ];

  return (
    <div className="archives">
      <h1>Archives</h1>
      <div className="thumbs">
        {images.map((image, index) => (
          <div key={index} className="thumb">
            <img src={`/images/thumbs/${image}`} alt={`Issue ${image}`} />
            <p>{convertFilenameToDate(image)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archives;
