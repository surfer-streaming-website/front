import React, { useContext, useEffect, useState } from "react";
import "./MyAlbum.css";
import axios from "axios";
import AlbumItem from "../../components/user/AlbumItem";
import { LogingedContext } from "../../App";
import {
  authExceptionHandler,
  logInByRefreshToken,
} from "../../components/auth/AuthUtil";

const Album = () => {
  const [AlbumRes, setAlbumRes] = useState({});

  let logingedCon = useContext(LogingedContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (
      !localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      logInByRefreshToken();
    }
  };

  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/album/status/"+2).then((res) => {
  //     setAlbumRes(res.data);
  //   });
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/album/status", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setAlbumRes(res.data);
      })
      .catch((err) => {
        //  alert(err.response);
        if (err.response.status == 401 || err.response.status == 403) {
          authExceptionHandler(err, fetchData);
        } else {
          console.log(err);
        }
      });
  }, []);

  const albumDelete = (albumSeq) => {
    console.log("삭제할 albumSeq:", albumSeq);
    axios
      .delete("http://localhost:8080/api/album/delete/" + albumSeq, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setAlbumRes((prevAlbumRes) =>
          prevAlbumRes.filter((album) => album.albumSeq !== albumSeq)
        );
      })
      .catch((err) => {
        // alert(err.response);
        if (err.response.status == 401 || err.response.status == 403) {
          authExceptionHandler(err, fetchData);
        } else {
          console.log(err);
        }
      });
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
