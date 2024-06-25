import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  logInByRefreshToken,
  authExceptionHandler,
} from "../../../components/auth/AuthUtil";
import axios from "axios";

const ArtistApplicationDetail = () => {
  const { id } = useParams();
  const [artistApplication, setArtistApplication] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (
      !localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      await logInByRefreshToken();
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:8080/api/v1/auth/artist-application/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      setArtistApplication(response.data.data);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        authExceptionHandler(error, fetchData);
      } else {
        console.log(error);
      }
    }
  };

  const handleFormUpdate = () => {
    navigate('./update');
  };

  const handleNavigateList = () => {
    navigate('/auth/artist-application');
  };

  const handleFormDelete = async () => {
    if (
      !localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      await logInByRefreshToken();
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `http://localhost:8080/api/v1/auth/artist-application/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      alert("삭제가 완료되었습니다.")
      navigate('/auth/artist-application');
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        authExceptionHandler(error, fetchData);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>Application ID: {artistApplication.artistApplicationId}</div>
      <div>가수 이름: (artistApplication.artistName)</div>
      <div>앨범 이름: {artistApplication.albumName}</div>
      <div>저자 이름: {artistApplication.authorName}</div>
      <div>저작권자 이름: {artistApplication.copyrightName}</div>
      <div>국내외 구분: {artistApplication.locationType}</div>
      <div>장르: {artistApplication.sector}</div>
      <button onClick={handleFormUpdate}>수정하기</button>
      <button onClick={handleFormDelete}>삭제하기</button>
      <button onClick={handleNavigateList}>목록으로</button>
      <div>처리 상태: {artistApplication.status}</div>
    </div>
  );
};

export default ArtistApplicationDetail;