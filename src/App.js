import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumPhotos, setAlbumPhotos] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
      .then(response => {
        setAlbumPhotos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleClosePopup = () => {
    setSelectedAlbum(null);
    setAlbumPhotos([]);
  };

  return (
    <div>
      <h1>Albums</h1>
      <div className="album-list">
        {albums.map(album => (
          <div key={album.id} className="album-item">
            <button onClick={() => handleAlbumClick(album)}>
              {album.title}
            </button>
          </div>
        ))}
      </div>
      {selectedAlbum && (
        <div className="popup">
          <h2>{selectedAlbum.title}</h2>
          <button className="close-button" onClick={handleClosePopup}>
            Close
          </button>
          <div className="photo-grid">
            {albumPhotos.map(photo => (
              <div key={photo.id} className="photo-item">
                <img src={photo.url} alt={photo.title} />
                <p>{photo.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
