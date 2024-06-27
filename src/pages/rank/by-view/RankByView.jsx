import axios from "axios";
import React, { useEffect, useState } from "react";
import "./RankByView.css"
import { useNavigate } from "react-router-dom";
const RankByView = () => {
  const [songs, setSongs] = useState([]);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`http://localhost:8080/api/song/rank`);
      console.log("브베입니다   ", response.data.data);
      setSongs(response.data.data);
    } catch (error) {
      console.error("unknown");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
const navigate=  useNavigate();

const liOnCLick = (e) =>{
  navigate(``);
}

  return (
    <div className="rank-by-view-container">
      <h1>Song Ranking</h1>
      <ul>
        {songs.map((song, index) => (
          <li key={index} onClick={() => liOnCLick(song.songSeq)}>
            <div className="rank-song-item">
              <p className="rank-song-rank">{song.rank + 1} 위</p>
              <img
                src={song.url || "https://i.ibb.co/cJpPZMq/b.jpg"}
                alt={song.songTile}
                className="rank-image"
              />
              <p className="rank-song-title">제목: {song.songTile}</p>
              <p>{song.songAuthor}</p>
              {/* <p>Sequence: {song.songSeq}</p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankByView;
