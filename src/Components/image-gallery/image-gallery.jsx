import React, { useState, useEffect } from 'react';
import './image-gallery.scss';
import { backend_api } from "../../constants"; 

//const API_URL = 'backend_api';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = () => {
    if (!selectedFile) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch(`${backend_api}/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        fetchImages();
      })
      .catch((err) => {
        console.error(err);
        alert('Image upload failed');
      });
  };

  const fetchImages = () => {
    fetch(`${backend_api}/list`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.map((item) => item.Key));
      })
      .catch((err) => console.error('Error fetching images:', err));
  };

  return (
    <div className="gallery-container">
      <h2>📸 Image Gallery</h2>
      <div className="upload-box">
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div className="gallery">
        {images.map((img, index) => (
          <div className="image-card" key={index}>
            <div className="image-wrapper">
               <div className="image-item">
               <img src={`${backend_api}/download/resized/${img}`} alt="Resized" />
               <p>Resized Image</p>
               </div>
               <div className="image-item">
               <img src={`${backend_api}/download/${img}`} alt="Original" />
               <p>Original Image</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
