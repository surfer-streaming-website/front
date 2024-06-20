import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  logInByRefreshToken,
  authExceptionHandler,
} from "../../../components/auth/AuthUtil";
import axios from "axios";

const ArtistApplicationDetail = () => {
  // http://localhost:8080/api/v1/admin/artist-application/5
  const { id } = useParams();
  const [artistApplication, setArtistApplication] = useState({});

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
        `http://localhost:8080/api/v1/admin/artist-application/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      console.log(response.data.data);
      setArtistApplication(response.data.data);
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
      <div>가수 이름: {new Date(artistApplication.artistName).toLocaleString()}</div>
      <div>앨범 이름: {artistApplication.albumName}</div>
      <div>저자 이름: {artistApplication.authorName}</div>
      <div>저작권자 이름: {artistApplication.copyrightName}</div>
      <div>국내외 구분: {artistApplication.locationType}</div>
      <div>장르: {artistApplication.sector}</div>
      <div>처리 상태: {artistApplication.status}</div>
    </div>
  );
};

export default ArtistApplicationDetail;
