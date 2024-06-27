import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./PlaylistSaveForm"
import './PlaylistSaveForm.css';

const PlaylistSaveForm = () => {
  const { song } = useParams();
  const [playlist, setPlaylist] = useState({
    playlistName: '',
    isOpen: 0,
    tagList: []
  });
  const [tagList, setTagList] = useState([]);
  const [selectedTagsCount, setSelectedTagsCount] = useState(0);

  const navigator = useNavigate();

  const tags = [
    '나른한', '신나는', '우울한', '잔잔한', '슬픈', '비', '맑음', '드라이브',
    '출근', '퇴근', '공부 중', '잘 때', '지칠 때', '운동', '힐링'
  ];

  useEffect(() => {
    setTagList(tags);
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
  
    setPlaylist(prevPlaylist => {
      if (type === 'checkbox' && name === 'isOpen') {
        const newIsOpen = checked ? 1 : 0;
        return { ...prevPlaylist, [name]: newIsOpen };

      } else if (type === 'checkbox') {
        let updatedTags;

        if (checked) {
          if (selectedTagsCount >= 3) {
            return prevPlaylist;
          }
          
          updatedTags = [ ...prevPlaylist.tagList, value ];
        } else {
          updatedTags = prevPlaylist.tagList.filter(tag => tag !== value);
        }
  
        setSelectedTagsCount(updatedTags.length);

        return { ...prevPlaylist, [name]: updatedTags };
        
      } else {
        return { ...prevPlaylist, [name]: value };
      }
    });
  };

  const submitSave = (e) => {
    axios({
      method: "post",
      url: "http://localhost:8080/api/v1/playlist/"+song+"/newPlaylist",
      data: playlist,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      }
    })
      .then((res) => {
        navigator("/myPlaylists");
      })
      .catch((err) => {
        alert("플레이리스트를 생성할 수 없습니다.");
      });
  };

    return (
      <div>
        <div>
          <label htmlFor="name" className='savePlaylist'>플레이리스트 이름:</label>
          <input
            type="text"
            id="playlistName"
            name="playlistName"
            onChange={ handleChange }
          />
        </div>
        <div>
          {tagList.map((tagName) => (
            <label key={ tagName } className='savePlaylist'>
              <input
                type="checkbox"
                name="tagList"
                value={ tagName }
                checked={ playlist.tagList.includes(tagName) }
                onChange={ handleChange }
              />
              { tagName }
            </label>
          ))}
        </div>
        <div>
          <label className='savePlaylist'>
            <input
              type="checkbox"
              name="isOpen"
              checked={ playlist.isOpen === 1 }
              onChange={ handleChange }
            />
            공개
          </label>
        </div>
        <button onClick={ submitSave }>플레이리스트 저장</button>
    </div>
    );
};

export default PlaylistSaveForm;