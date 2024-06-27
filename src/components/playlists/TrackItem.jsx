import React, { useContext } from 'react';
import axios from 'axios';
import './css/TrackItem.css';
import { PlayerContext, PlaylistContext } from '../../App.jsx';

const TrackItem = (props) => {
    const {song} = props.track; //playlist track 에서 가져오기
    const {albumImage, songName, artist, songId, soundSource} = song;
    const {audio, setPlaying, setSongInfo} = useContext(PlayerContext);
    const {musicList, setMusicList, setCurrentSongIndex} = useContext(PlaylistContext);

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
            // console.log(err);
            alert("삭제 실패");
        })
    }

    const downloadSong = ()=>{
        const downloadUrl = `http://localhost:8080/api/song/download/${songId}`;
        window.location.href = downloadUrl;
    }

    const onPlay = ()=>{
        audio.src = soundSource;
        audio.play();

        setPlaying(true);
        setSongInfo(song);

        setMusicList(prevMusicList => [...prevMusicList, song]);

        const newIndex = musicList.length;
        setCurrentSongIndex(newIndex);
    }

    return (
        <div className='track-item'>
            <img src={ albumImage } referrerPolicy="no-referrer"/>
            <p>{ songName }</p>
            <p>{ artist.filter((singer) => singer) }</p>
            <button className='track-btn' onClick={onPlay}>재생</button>
            <button className='track-btn' onClick={downloadSong}>다운로드</button>
            <button onClick={ deleteSong } className='track-btn'>삭제</button>
        </div>
    );
};

export default TrackItem;