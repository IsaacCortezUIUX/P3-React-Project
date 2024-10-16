// src/components/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

function HomePage() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get('https://api.pexels.com/v1/curated', {
      headers: {
        Authorization: 'toLLoejNIzq7R9simI9ZdQtnlI8qZS3fugb1btL0RQifXkSRg2qWUL8R'
      }
    }).then(response => {
      setArtworks(response.data.photos);
    }).catch(error => {
      console.error("There was an error fetching the artwork!", error);
    });
  }, []);

  return (
    <div className="home-page">
      <h1>Art Cart</h1>
      <div className="art-grid">
        {artworks.map(art => (
          <Link to={`/product/${art.id}`} key={art.id} className="art-item"> {/* Wrap in Link */}
            <img src={art.src.medium} alt={art.photographer} />
            <p>{art.photographer}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
