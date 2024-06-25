import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SongInsertButton = (props) => {
    const navigate = useNavigate();

    const insertSong = () => {
        console.log(props.playlistId);
        axios ({
            method: "post",
            url: "http://localhost:8080/api/v1/playlist/" + props.songId + "/" + props.playlistId + "/addSong",
            headers: {
              Authorization: localStorage.getItem("accessToken")
            }
        })
        .then(()=>{
            // window.location.replace("/myPlaylists/"+playlistId);
            alert("플레이리스트에 노래를 담았습니다");
            navigate("/myPlaylists/"+props.playlistId);
        })
        .catch(()=>{
            alert("플래이리스트에 노래를 담을 수 없습니다.");
        });
    }

    return (
        <div>
            <button onClick={insertSong}>담기</button>
        </div>
    );
};

export default SongInsertButton;