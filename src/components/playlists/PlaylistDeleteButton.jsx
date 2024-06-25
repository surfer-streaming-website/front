import React from 'react';
import axios from 'axios';

const PlaylistDeleteButton = (props) => {
    const deletePlaylist = () => {
        axios ({
            method: "delete",
            url: "http://localhost:8080/api/v1/playlist/myPlaylists/"+props.playlistId,
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
        <div>
            <button onClick={deletePlaylist}>삭제</button>
        </div>
    );
};

export default PlaylistDeleteButton;