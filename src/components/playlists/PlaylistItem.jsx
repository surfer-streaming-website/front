import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/PlaylistItem.css';

const PlaylistItem = (props) => {
    const {playlistId, playlistImage, playlistName, isOpen, tagList, nickname} = props.playlist //playlsit group에서 가져오기

    const navigator = useNavigate();
    
    const linkToDetail = () => {
        if(!props.isSave){
            navigator("/myPlaylists/" + playlistId);
        }
    }
    
      return (
          <div onClick={linkToDetail} className='playlist-item'>
                <div className='playlist-img'>
                    <img src={ playlistImage } referrerPolicy="no-referrer"/>
                    <p className='track-text'>{ playlistName }</p>
                    <p className='track-text'>{ nickname }</p>
                    { isOpen === 1 ? <p className='track-text'>공개</p> : <p className='track-text'>비공개</p>}
                    <p className='track-text'>{ tagList }</p>
                </div>
          </div>
    );
};

export default PlaylistItem;