import React from "react";
import "../../pages/search/Search.css";

import { Link } from "react-router-dom";

const SearchItem = (props) => {
  const { searchkeyword } = props;
  const song = searchkeyword || {}; // song 객체가 없을 경우 빈 객체로 설정
  const { albumImage, songTitle, songSingerName, songSeq } = song;

  return (
    <div className="song-list">
      <Link to={`/album/detail/${songSeq}`}>
        <img className="album-image" src={albumImage} alt={albumImage} />
      </Link>
      <div className="song-info">
        <Link className="song-title" to={`/song/detail/${songSeq}`}>
          {songTitle}
        </Link>
        <span className="song-singer">{songSingerName}</span>
      </div>
    </div>
  );
};

export default SearchItem;
