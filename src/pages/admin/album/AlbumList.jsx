import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AlbumList.css";
import AdminNavigation from "../../../components/navigation/AdminNavigation"; // AdminNavigation 임포트
import { useNavigate } from "react-router-dom";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [message, setMessage] = useState(""); // 메시지 상태 추가

  const navigate = useNavigate();
  useEffect(() => {
    fetchAlbums();
  }, [setAlbums]);

  const fetchAlbums = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/login");
      }
      const response = await axios.get(
        "http://localhost:8080/api/album/status/all",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      setAlbums(response.data.data);
    } catch (error) {
      console.error("Failed to fetch albums:", error);
    }
  };

  // const handleStatusChange = async (albumSeq, newStatus) => {
  //   try {
  //     const token = localStorage.getItem('accessToken');
  //     if (!token) {
  //       throw new Error('Token not found');
  //     }

  //     await axios.put(
  //       `http://localhost:8080/api/album/updateStatus/${albumSeq}`,
  //       { albumState: newStatus }
  //       // ,
  //       // {
  //       //   headers: {
  //       //     'Authorization': `${token}`
  //       //   }
  //       // }
  //     );
  const handleStatusChange = (albumSeq, newStatus) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("albumlist       ", newStatus, albumSeq);
      if (!accessToken) {
        navigate("/login");
      }
      axios.put(`http://localhost:8080/api/album/updateStatus/${albumSeq}`, {
        albumState: newStatus 
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      setAlbums((prevAlbums) =>
        prevAlbums.map((album) =>
          album.albumSeq === albumSeq
            ? { ...album, albumState: newStatus }
            : album
        )
      );
      setMessage("앨범 상태가 성공적으로 변경되었습니다."); // 성공 메시지 설정
      setTimeout(() => setMessage(""), 3000); // 3초 후에 메시지 숨기기
    } catch (error) {
      console.error("Failed to update album status:", error);
      setMessage("앨범 상태 변경에 실패했습니다."); // 실패 메시지 설정
      setTimeout(() => setMessage(""), 3000); // 3초 후에 메시지 숨기기
    }
  };

  return (
    <div className="album-list-container">
      <AdminNavigation /> {/* AdminNavigation 추가 */}
      <div className="album-list-content">
        <h1>Album List</h1>
        {message && <div className="message">{message}</div>}{" "}
        {/* 메시지 표시 */}
        <table className="album-table">
          <thead>
            <tr>
              <th>Seq</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Release Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.albumSeq}>
                <td>{album.albumSeq}</td>
                <td>{album.albumTitle}</td>
                <td>{album.albumSinger}</td>
                <td>{album.albumRegDate}</td>
                <td>{album.albumState}</td>
                <td>
                  <select
                    value={album.albumState}
                    onChange={(e) => handleStatusChange(
                      album.albumSeq,
                      parseInt(e.target.value)
                    )
                    }
                  >
                    <option value={0}>심사중</option>
                    <option value={1}>등록 완료</option>
                    <option value={2}>반려됨</option>
                    <option value={3}>숨김(삭제)</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumList;
