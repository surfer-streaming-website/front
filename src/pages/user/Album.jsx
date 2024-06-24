import React, { useEffect, useState } from "react";
import "../../user.css";
import axios from "axios";
import AlbumItem from "../../components/user/AlbumItem";
import "../../MyAlbum.css";

const Album = () => {
  const [AlbumRes, setAlbumRes] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/album/status/" + 2).then((res) => {
      setAlbumRes(res.data);
    });
  }, []);

  const albumDelete = (albumSeq) => {
    console.log("삭제할 albumSeq:", albumSeq);
    axios
      .delete("http://localhost:8080/api/album/delete/" + albumSeq)
      .then((res) => {});
  };

  return (
    <div className="myAlbum">
      <h3>마이페이지</h3>

      <div>
        <h3>앨범</h3>
        <table className="myalbum-table">
          <thead>
            <th>앨범이름</th>
            <th>신청일</th>
            <th>상태</th>
          </thead>
          {/* <div> */}
          <tbody>
            {/* {AlbumRes.length > 0 ? (
              AlbumRes.map((album, index) => (
                <AlbumItem key={index} albumlist={album} />
              ))
            ) : (
              <p>검색 결과가 없습니다</p>
            )}*/}

            {AlbumRes.length > 0 ? (
              AlbumRes.map((album, index) => (
                <AlbumItem
                  key={index}
                  albumlist={{ ...album, onDelete: albumDelete }}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3">검색 결과가 없습니다</td>
              </tr>
            )}
          </tbody>

          {/* </div> */}
        </table>
      </div>
    </div>
  );
};

export default Album;
