import React, { useEffect, useState } from "react";
import "../../user.css";
import axios from 'axios';
import AlbumItem from '../../components/user/AlbumItem';


const Album = () => {

    const [AlbumRes, setAlbumRes] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/album/status/" + 2).then((res) => {

        setAlbumRes(res.data);
    });
  }, []);



    return (
        <div className="myAlbum">
            <h3>마이페이지</h3>

            <div>
        <h3>앨범</h3>

        <div>
          {AlbumRes.length > 0 ? (
            AlbumRes.map((album, index) => (
                <AlbumItem key={index} albumlist={album} />
              ))
          ) : (
            <p>검색 결과가 없습니다</p>
          )}
        </div>
      </div>
        </div>
    );
};

export default Album;