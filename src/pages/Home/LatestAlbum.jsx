import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LatestAlbum.css';
import { useNavigate } from 'react-router-dom';

const LatestAlbum = () => {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = () => {
    // 로그인, 비로그인 둘 다 사용 가능하도록 설정
    const token = localStorage.getItem('accessToken');
    const headers = token ? { 'Authorization': token } : {};
    
    axios.get('http://localhost:8080/api/album/latest')
      .then(response => {
        console.log("??", response.data.data[0].url);
        setAlbums(response.data.data);  // 최신 앨범 데이터 설정
      })
      .catch(error => {
        console.error("There was an error fetching the albums!", error);
      });
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const navigate = useNavigate();

  const albumItemClick = (albumSeq) => {
    navigate(`/album/detail/${albumSeq}`);
  }

  return (
    <div className="latestAlbum-container">
      <h1 className="title">최신 앨범</h1>
      <div className="albums-grid">
        {albums.map((album, index) => (
          <div key={index} className="album-item" onClick={() => albumItemClick(album.albumSeq)}>
            <img 
              src={album.url || 'https://i.ibb.co/Mp0nHqm/e.jpg'} // 기본 이미지 URL 사용
              alt={album.albumTitle} 
              className="album-cover" 
            />
            <p className="album-title">{album.albumTitle}</p>
            <p className="album-artist">{album.singer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestAlbum;
