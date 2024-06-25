import React, { useEffect, useState } from 'react';
import ArtistItem from './ArtistItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/TrackItem.css';

const TrackItem = (props) => {
    const {song} = props.track; //playlist track 에서 가져오기
    const {albumImage, songName, artist, songId} = song;

    const navigate = useNavigate();

    const deleteSong = ()=>{
        axios ({
            method: "delete",
            url:"http://localhost:8080/api/v1/playlist/myPlaylists/"+props.playlistId+"/"+songId,
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
        .then(()=>{
            props.fetchData();
        })
        .catch((err)=>{
            console.log(err);
            alert("삭제 실패");
        })
    }

    return (
        <div className='track-item'>
            <img src={ albumImage } referrerPolicy="no-referrer"/>
            <p>{ songName }</p>
            <p>{ artist.map((singer) => <ArtistItem key = {songId} singer = {singer}/>) }</p>
            <button >재생</button>
            <button >다운로드</button>
            <button onClick={ deleteSong }>삭제</button>
        </div>
    );
};

export default TrackItem;