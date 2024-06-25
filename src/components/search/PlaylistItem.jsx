import React from "react";
import "../../pages/search/Search.css";
import { Link } from "react-router-dom";

const PlaylistItem = (props) => {
  const { searchkeyword } = props;
  const album = searchkeyword || {}; // playlist 객체가 없을 경우 빈 객체로 설정
  const { playListName, memberName, albumImage, playlistGroupSeq } = album;

  return (
    <div>
      <Link to={`/myplaylist/${playlistGroupSeq}`}>
        <img className="album-image" src={albumImage} alt={albumImage} />
      </Link>
      <div className="album-info">
        <Link className="playlist-name" to={`/myplaylist/${playlistGroupSeq}`}>
          {playListName}
        </Link>

        <div className="album-singer">{memberName}</div>
      </div>
    </div>
  );
};

export default PlaylistItem;
