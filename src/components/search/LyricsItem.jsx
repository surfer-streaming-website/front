import React from "react";
import "../../Search.css";

const LyricsItem = (props) => {
  const { searchkeyword } = props;
  const album = searchkeyword || {}; // lyrics 객체가 없을 경우 빈 객체로 설정
  const { albumImage, songTitle, songSingerName, lyrics } = album;

  return (
    <div>
      <div className="album-list">
        <img className="lyrics-image" src={albumImage} alt={albumImage} />
        <div className="album-info">
          <span className="album-title">{songTitle}</span>
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
