import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Genre.css";
import { useNavigate } from "react-router-dom";

const Genre = () => {
  const [songs, setSongs] = useState([]);
  const [genre, setGenre] = useState("전체");

  const navigate = useNavigate();

  const fetchSongs = (selectedGenre) => {
    const url =
      selectedGenre === "전체"
        ? "http://localhost:8080/api/song/all"
        : `http://localhost:8080/api/song/genre/${selectedGenre}`;

    const token = localStorage.getItem("accessToken");
    const headers = token ? { Authorization: token } : {};

<<<<<<< HEAD
    axios
      .get(url, { headers })
      .then((response) => {
        setSongs(response.data.data);
        console.log(response.data.data);
=======
    axios.get(url, { headers })
      .then(response => {
        setSongs(response.data.data);
        console.log("sdaf : ", response.data.data)   
        
>>>>>>> 6d4c4053113edbaef609313213b372103b71efa7
      })
      .catch((error) => {
        console.error("There was an error fetching the songs!", error);
      });
  };

  useEffect(() => {
    fetchSongs(genre);
  }, [genre]);

  const songItemClick = (songSeq) => {
    navigate(`/song/detail/${songSeq}`);
  };

  return (
    <div className="genre-container">
      <h1 className="title">곡 리스트</h1>
      <div className="genre-buttons">
        {[
          "전체",
          "발라드",
          "R&B/소울",
          "락",
          "랩/힙합",
          "일렉트로니카",
          "블루스",
          "포크",
        ].map((g, index) => (
          <button key={index} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
      </div>
      <div className="songs-grid">
        {songs.map((song, index) => (
          <div key={index} className="song-item" onClick={() => songItemClick(song.songSeq)}>
            <img 
              src={song.url || 'https://i.ibb.co/cJpPZMq/b.jpg'} // 기본 이미지 URL 사용
              alt={song.songTitle} 
              className="song-cover" 
            />
            <p className="song-title">{song.songTitle}</p>
            <p className="song-artist">{song.singer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
