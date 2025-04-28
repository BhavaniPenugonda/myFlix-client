import React, { useState, useEffect } from 'react';
import './image-gallery.scss';
import { backend_api, bucket_url } from "../../constants"; 

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
  const imageKey = images.filter ((item) => !item.includes('resized'));
  
  return (
    <div className="gallery-container">
      <h2>📸 Image Gallery</h2>
      <div className="upload-box">
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div className="gallery">
        {imageKey.map((img, index) => (
          <div className="image-card" key={index}>
            <div className="image-wrapper">
               <div className="image-item">
               <img src={`${bucket_url}/resized/${img}`} alt="Resized" />
               <p>Resized Image</p>
               </div>
               <div className="image-item">
               <img src={`${bucket_url}/${img}`} alt="Original" />
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
