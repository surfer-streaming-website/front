import React from "react";
import "../../pages/search/Search.css";
import { Link } from "react-router-dom";

const LyricsItem = (props) => {
  const { searchkeyword } = props;
  const album = searchkeyword || {}; // lyrics 객체가 없을 경우 빈 객체로 설정
  const { albumImage, songTitle, songSingerName, lyrics, songSeq } = album;

  return (
    <div>
      <div className="album-list">
        <Link to={`/song/detail/${songSeq}`}>
          <img className="album-image" src={albumImage} alt={albumImage} />
        </Link>
        
        <div className="album-info">
          <Link className="song-title" to={`/song/detail/${songSeq}`}>
            {songTitle}
          </Link>

          <span className="album-singer">{songSingerName}</span>
        </div>
      </div>

      <div className="lyrics-result">
        <span>{lyrics}</span>
      </div>
    </div>
  );
};

export default LyricsItem;
