import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlaylistItem from '../../../components/playlists/PlaylistItem';
import SongInsertButton from '../../../components/playlists/SongInsertButton';
import './Exist.css';

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
            navigate("/playlist/"+songSeq+"/save");
        });
    }, []);

    return (
        <div className='is-exist'>
            <Link to={"/playlist/"+songSeq+"/save"} className='create'>새로 만들기</Link>
            <p className='playlist'>{playlists.map((playlist) => (
                <React.Fragment key={ playlist.playlistId }>
                    <PlaylistItem playlist={ playlist } isSave={true}/>
                    <SongInsertButton playlistId={ playlist.playlistId } songId={ songSeq } />
                </React.Fragment>
            ))}</p>
        </div>
    );
};

export default Exist;