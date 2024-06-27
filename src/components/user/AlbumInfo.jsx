import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AlbumInfo.css";
import axios from "axios";
import { authExceptionHandler, logInByRefreshToken } from "../auth/AuthUtil";
import { LogingedContext } from "../../App";
const AlbumInfo = () => {
  const [singerStatus, setSingerStatus] = useState();
  const [isSinger, setIsSinger] = useState(false);

  const logingedCon = useContext(LogingedContext);

  useEffect(() => {
    console.log("insert form start");
    fetchData();
    userAuthorityCheck();
  }, []);

  const fetchData = () => {
    console.log("insert form");
    if (
      !localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      logInByRefreshToken();
    }
  };

  const userAuthorityCheck = () => {
    axios
      .get("http://localhost:8080/api/album/userAuthority", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setSingerStatus(res.data);
        console.log("console.log = " + res.data);
        console.log("singerStatus.log = " + singerStatus);

        if (res.data === "ROLE_SINGER") setIsSinger(true);
        console.log(isSinger);
      })
      .catch((err) => {
        if (err.response.status == 401 || err.response.status == 403) {
          authExceptionHandler(err, fetchData);
        } else {
          console.log(err);
        }
      });
  };

  const handleLinkClick = (event) => {
    if (!isSinger) {
      event.preventDefault();
      alert("가수만 이용 가능합니다!");
    }
  };

  return (
    <div>
      <div className="myalbum-menus">
        <Link
          className="myalbum-menus1"
          to="/myalbum"
          onClick={handleLinkClick}
        >
          앨범 신청 내역
        </Link>
      </div>

      <div>
        <Link
          className="myalbum-menus1"
          to="/album/insert"
          onClick={handleLinkClick}
        >
          앨범 등록 신청
        </Link>
      </div>
    </div>
  );
};

export default AlbumInfo;
