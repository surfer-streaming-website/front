import React from "react";
import "../../pages/search/Search.css";
import { Link } from "react-router-dom";

const AlbumItem = (props) => {
  const { searchkeyword } = props;
  const album = searchkeyword || {}; // album 객체가 없을 경우 빈 객체로 설정
  const { albumImage, albumTitle, albumSingerName, albumSeq } = album;
  return (
    <div>
      <Link to={`/album/detail/${albumSeq}`}>
        <img className="album-image" src={albumImage} alt={albumTitle} />
      </Link>

      <div className="album-info">
        <Link className="song-title" to={`/album/detail/${albumSeq}`}>
          {albumTitle}
        </Link>

        <span className="album-singer">{albumSingerName}</span>
      </div>
      
    </div>
  );
};

export default AlbumItem;
