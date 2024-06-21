import React from "react";
import "../../Search.css";

const AlbumItem = (props) => {
  const { searchkeyword } = props;
  const album = searchkeyword || {}; // album 객체가 없을 경우 빈 객체로 설정
  const { albumImage, albumTitle, albumSingerName } = album;
  return (
    <div>
      <img className="album-image" src={albumImage} alt={albumTitle} />
      <div className="album-info">
        <span className="album-title">{albumTitle}</span>
        <span className="album-singer">{albumSingerName}</span>
      </div>
    </div>
  );
};

export default AlbumItem;
