import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TrackItem from '../../../components/playlists/TrackItem';
import TagItem from '../../../components/playlists/TagItem';
import './PlaylistDetail.css';

const PlaylistDetail = () => {
    const { id } = useParams();
    const [playlist , setPlaylist] = useState([]);
    const { playlistId, playlistImage, playlistName, track, tag, nickname } = playlist;

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = ()=>{
      axios
        .get("http://localhost:8080/api/v1/playlist/myPlaylists/" + id, {
          headers: {
              Authorization: localStorage.getItem("accessToken")
          }
        })
        .then((res) => {
            setPlaylist(res.data.data);
        })
        .catch((err) => {
            navigate("/myPlaylists");
        });
    }

    const update = () => {
      navigate("/" + playlistId + "/updatePlaylist");
    }

    return (
        <div className='playlist-detail'>
            <h1>playlist detail</h1>
            <div className='detail-playlist-item'>
                <img src={ playlistImage } referrerPolicy="no-referrer"/>
                <p>{ playlistName }</p>
                <p>{ nickname }</p>
                <p>{ tag && tag.map((tag) => <TagItem key={tag.tagName} tag={tag}/>) }</p>
            </div>
            <button onClick={ update }>수정</button>
            <p>{ track && track.map((track) => <TrackItem key={track.trackId} track={track} playlistId={playlistId} fetchData={fetchData}/>) }</p>
        </div>
    );
};

export default PlaylistDetail;