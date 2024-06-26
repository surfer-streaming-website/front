import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInfo from "../../../components/user/MyInfo";
import AlbumInfo from "../../../components/user/AlbumInfo";
import "./MyPage.css"
const MyPage = () => {
  const [category, setCategory] = useState("myinfo");

  const handleCategory = (e) => {
    setCategory(e.target.className);
  };

  return (
    <div className="container">
      <div className="head"></div>
      <div className="body">
        <div className="navigate">
          <div className="myinfo" onClick={handleCategory}>
            내 정보
          </div>
          <div className="albuminfo" onClick={handleCategory}>
            앨범 등록 내역
          </div>
        </div>
        <br />
        <div className="content">
          {category === "myinfo" ? (
            <MyInfo />
          ) : category === "albuminfo" ? (
            <AlbumInfo />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
