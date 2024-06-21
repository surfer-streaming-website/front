import React from "react";
import "../../Search.css";

const SearchItem = (props) => {
  const { searchkeyword } = props;
  const song = searchkeyword || {}; // song 객체가 없을 경우 빈 객체로 설정
  const { albumImage, songTitle, songSingerName } = song;

  return (
    <div className="song-list">
      <img className="song-image" src={albumImage} alt={songTitle} />
      <div className="song-info">
        <span className="song-title">{songTitle}</span>
        <span className="song-singer">{songSingerName}</span>
      </div>
    </div>
  );
};

export default SearchItem;
