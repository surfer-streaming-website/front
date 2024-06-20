import React from "react";
import "../../Search.css";

const PlaylistItem = (props) => {
  const { searchkeyword } = props;
  const album = searchkeyword || {}; // playlist 객체가 없을 경우 빈 객체로 설정
  const { playListName, memberName, albumImage } = album;

  return (
    <div>
      <img className="playlist-image" src={albumImage} alt={playListName} />
      <div className="album-info">
        <div className="album-title">{playListName}</div>
        <div className="album-singer">{memberName}</div>
      </div>
    </div>
  );
};

export default PlaylistItem;
