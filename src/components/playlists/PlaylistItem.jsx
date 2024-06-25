import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TagItem from './TagItem';
import './css/PlaylistItem.css';

const PlaylistItem = (props) => {
    const {playlistId, playlistImage, playlistName, isOpen, tag, nickname} = props.playlist //playlsit group에서 가져오기

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
                    <p>{ playlistName }</p>
                    <p>{ nickname }</p>
                    { isOpen === 1 ? <p>공개</p> : <p>비공개</p>}
                </div>
                <div>{tag.map((tag) => <TagItem key={tag.tagName} tag={tag}/>)}</div>
          </div>
    );
};

export default PlaylistItem;