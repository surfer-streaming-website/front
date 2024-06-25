import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlaylistItem from '../../../components/playlists/PlaylistItem';
import SongInsertButton from '../../../components/playlists/SongInsertButton';

const Exist = () => {
    const [playlists , setPlaylists] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const songSeq = location.state.songSeq;

    useEffect(()=>{
        axios
        .get("http://localhost:8080/api/v1/playlist/myPlaylists", {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }})
        .then((res)=>{
            setPlaylists(res.data.data);
        })
        .catch((err)=>{
            navigate("/save/" + songSeq + "/playlist");
        });
    }, []);

    const createPlaylist = () => {
        navigate("/save/" + songSeq + "/playlist");
    }

    return (
        <div>
            <button onClick={ createPlaylist }>새로 만들기</button>
            <p>{playlists.map((playlist) => (
                <React.Fragment key={ playlist.playlistId }>
                    <PlaylistItem playlist={ playlist } />
                    <SongInsertButton playlistId={ playlist.playlistId } songId={ songSeq } />
                </React.Fragment>
            ))}</p>
        </div>
    );
};

export default Exist;