import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlaylistItem from '../../../components/playlists/PlaylistItem';
import PlaylistDeleteButton from '../../../components/playlists/PlaylistDeleteButton';
import './MyPlaylist.css';

const MyPlaylist = () => {
    const [playlists , setPlaylists] = useState([]);
    const navigate = useNavigate();
  
    useEffect(()=>{
      fetchData();
    }, []);

    const fetchData = ()=>{
      axios
      .get("http://localhost:8080/api/v1/playlist/myPlaylists", {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      })
      .then((res)=>{
        setPlaylists(res.data.data);
      })
      .catch((err)=>{
        alert("플레이리스트가 없습니다.");
        navigate("/"); // -> Home 화면이나 차트 화면으로 이동시키기
      });
    }

    return (
        <div>
            <h1>My playlist</h1>
            <div className='myPlaylist'>
            {playlists.map((playlist) => (
                <React.Fragment key={ playlist.playlistId }>
                    <PlaylistItem playlist={ playlist } isSave={false}/>
                    <PlaylistDeleteButton playlistId={ playlist.playlistId } fetchData={ fetchData } className='playlistDel' />
                </React.Fragment>
            ))}
            </div>
        </div>
    );
};

export default MyPlaylist;