import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './PlaylistUpdateForm.css';

const PlaylistUpdateForm = () => {
    const {playlistSeq} = useParams();

    const [playlist, setPlaylist] = useState({
        playlistName: "",
        isOpen: 0,
        tagList: []
    });

    const tags = [
        '나른한', '신나는', '우울한', '잔잔한', '슬픈', '비', '맑음', '드라이브',
        '출근', '퇴근', '공부 중', '잘 때', '지칠 때', '운동', '힐링'
    ];

    const [checkedTags, setCheckedTags] = useState(tags);
    const [selectedTagsCount, setSelectedTagsCount] = useState(0);

    const navigate = useNavigate();

    useEffect(()=>{
        axios
        .get("http://localhost:8080/api/v1/playlist/myPlaylists/" + playlistSeq, {
          headers: {
              Authorization: localStorage.getItem("accessToken")
          }
        })
        .then((res) => {
            const { playlistName, isOpen, tagList } = res.data.data;

            setPlaylist({
                playlistName: playlistName,
                isOpen: isOpen,
                tagList: tagList.filter((t)=>t)
            });
        })
        .catch((err) => {
            navigate("/myPlaylists");
        });
    },[])

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setPlaylist(prevPlaylist => {
            if (type === 'checkbox' && name === 'tagList') {
                let updatedTags;

                if (checked) {
                    if (selectedTagsCount >= 3) {
                        return prevPlaylist;
                    }

                    updatedTags = [...prevPlaylist.tagList, value];  // 새로운 태그 추가
                } else {
                    updatedTags = prevPlaylist.tagList.filter(tag => tag !== value);  // 태그 제거
                }

                setSelectedTagsCount(updatedTags.length);  // 선택된 태그 수 업데이트
                setCheckedTags(prevCheckedTags => ({ ...prevCheckedTags, [value]: checked })); // 체크박스 상태 업데이트
                return { ...prevPlaylist, [name]: updatedTags };  // 변경된 태그 목록으로 상태 업데이트
            } else {
                return { ...prevPlaylist, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value };
            }
        });
    };

    const submitUpdate = (e) => {
        axios({
            method: "put",
            url: "http://localhost:8080/api/v1/playlist/myPlaylists/" + playlistSeq,
            data: playlist,
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            }
        })
        .then((res) => {
            navigate("/myPlaylists" + playlistSeq);
        })
        .catch((err) => {
            alert("플레이리스트를 수정할 수 없습니다.");
            // console.log(err);
        });
      };

    return (
        <div>
            <div className='update-playlist'>
                <label htmlFor="name">플레이리스트 이름:</label>
                <input  className='playlist-title'
                    type="text"
                    id="playlistName"
                    name="playlistName"
                    onChange={handleChange}
                    value={playlist.playlistName}
                />
            </div>
            <div className='tags'>
            {tags.map((tagName) => (
                    <label key={tagName} className='tag-label'>
                        <input
                            type="checkbox"
                            name="tagList"
                            value={tagName}
                            checked={ checkedTags[tagName] || playlist.tagList.includes(tagName)}
                            onChange={handleChange}
                        />
                        {tagName}
                    </label>
                ))}
            </div>
            <div>
                <label className='tag-label'>
                <input
                    type="checkbox"
                    name="isOpen"
                    checked={playlist.isOpen === 1}
                    onChange={handleChange}
                />
                공개
                </label>
            </div>
            <button onClick={submitUpdate} className='update-submit-btn'>플레이리스트 저장</button>
        </div>
    );
};

export default PlaylistUpdateForm;