import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TrackItem from '../../../components/playlists/TrackItem';
import './PlaylistDetail.css';

const PlaylistDetail = () => {
    const { playlistSeq } = useParams();
    const [playlist , setPlaylist] = useState([]);
    const { playlistId, playlistImage, playlistName, track, tagList, nickname } = playlist;

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = ()=>{
      axios
        .get("http://localhost:8080/api/v1/playlist/myPlaylists/" + playlistSeq, {
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
      navigate("/playlist/"+playlistId+"/update");
    }

    return (
        <div className='playlist-detail'>
            <h1>playlist detail</h1>
            <div className='detail-playlist-item'>
                <img src={ playlistImage } referrerPolicy="no-referrer"/>
                <p>{ playlistName }</p>
                <p>{ nickname }</p>
                <p>{ tagList && tagList.filter((tag)=>tag) }</p>
                <button onClick={ update } className='update-btn'>수정</button>
            </div>
            <p className='track-detail'>{ track && track.map((track) => <TrackItem key={track.trackId} track={track} playlistId={playlistId} fetchData={fetchData}/>) }</p>
        </div>
    );
};

export default PlaylistDetail;