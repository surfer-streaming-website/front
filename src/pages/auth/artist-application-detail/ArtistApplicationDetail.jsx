import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  logInByRefreshToken,
  authExceptionHandler,
} from "../../../components/auth/AuthUtil";
import axios from "axios";
import "./ArtistApplicationDetail.css";
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
    navigate("./update");
  };

  const handleNavigateList = () => {
    navigate("/auth/artist-application");
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
      alert("삭제가 완료되었습니다.");
      navigate("/auth/artist-application");
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        authExceptionHandler(error, fetchData);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="contents"/>
      <div className="contents"/>
      <div className="contents">
        <div>
          <div>Application ID: </div> 
          <div>{artistApplication.artistApplicationId}</div>
        </div>
      </div>
      <div className="contents">
        <div>
          <div>가수 이름: </div> 
          <div>(artistApplication.artistName)</div>
        </div>
      </div>
      <div className="contents">
        <div>
          <div>앨범 이름: </div> 
          <div>{artistApplication.albumName}</div>
          
        </div>
      </div>
      <div className="contents">
        <div>
          <div>저자 이름: </div> 
          <div>{artistApplication.authorName}</div>
        </div>
      </div>
      <div className="contents">
        <div>
          <div>저작권자 이름: </div>
          <div>{artistApplication.copyrightName}</div>
        </div>
      </div>
      <div className="contents">
        <div>
          <div>국내외 구분: </div> 
          <div>{artistApplication.locationType}</div>
        </div>
      </div>
      <div className="contents">
        <div>
          <div>장르: </div>
          <div>{artistApplication.sector}</div>
        </div>
      </div>
      <div className="contents">
        <div>
          <div>처리 상태: </div> 
          <div>{artistApplication.status}</div>
        </div>
      </div>
      <div className="contents">
        <div className="buttons"></div>
        <button onClick={handleFormUpdate}>수정하기</button>
        <button onClick={handleFormDelete}>삭제하기</button>
        <button onClick={handleNavigateList}>목록으로</button>
      </div>
    </div>
  );
};

export default ArtistApplicationDetail;
