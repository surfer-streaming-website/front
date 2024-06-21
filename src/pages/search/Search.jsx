import React, { useEffect, useState } from "react";
import "../../Search.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import SongItem from "../../components/search/SongItem";
import AlbumItem from "../../components/search/AlbumItem";
import LyricsItem from "../../components/search/LyricsItem";
import PlaylistItem from "../../components/search/PlaylistItem";

const Search = () => {
  const { keyword } = useParams();

  const [SearchRes, setSearchRes] = useState({
    song: [],
    album: [],
    playlist: [],
    lyrics: [],
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/search/" + keyword).then((res) => {
      setSearchRes(res.data);
    });
  }, [keyword]);

  return (
    <div className="Search">
      <h2>'{keyword}' 검색 결과</h2>

      <div className="Song">
        <h3>노래</h3>
        <div className="song-results">
          <div className="song-result-section">
            {SearchRes.song.slice(0, 8).filter((_, index) => index % 2 === 0)
              .length > 0 ? (
              SearchRes.song
                .slice(0, 8)
                .filter((_, index) => index % 2 === 0)
                .map((song, index) => (
                  <SongItem key={index} searchkeyword={song} />
                ))
            ) : (
              <p>검색 결과가 없습니다</p>
            )}
          </div>
          <div className="song-result-section">
            {SearchRes.song.filter((_, index) => index % 2 !== 0).length > 0 ? (
              SearchRes.song
                .slice(0, 8)
                .filter((_, index) => index % 2 !== 0)
                .map((song, index) => (
                  <SongItem key={index} searchkeyword={song} />
                ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>

      {/* 앨범 */}

      <div>
        <h3>앨범</h3>

        <div className="album-results">
          {SearchRes.album.length > 0 ? (
            SearchRes.album
              .slice(0, 8)
              .map((album, index) => (
                <AlbumItem key={index} searchkeyword={album} />
              ))
          ) : (
            <p>검색 결과가 없습니다</p>
          )}
        </div>
      </div>

      {/* 플레이리스트 */}
      <div>
        <h3>플레이리스트</h3>

        <div className="playlist-results">
          {SearchRes.playlist.length > 0 ? (
            SearchRes.playlist
              .slice(0, 8)
              .map((playlist, index) => (
                <PlaylistItem key={index} searchkeyword={playlist} />
              ))
          ) : (
            <p>검색 결과가 없습니다</p>
          )}
        </div>
      </div>

      {/* 가사 */}

      <div>
        <h3>가사</h3>
        <div className="lyrics-results">
          {SearchRes.lyrics.length > 0 ? (
            SearchRes.lyrics
              .slice(0, 6)
              .map((lyrics, index) => (
                <LyricsItem key={index} searchkeyword={lyrics} />
              ))
          ) : (
            <p>검색 결과가 없습니다</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
