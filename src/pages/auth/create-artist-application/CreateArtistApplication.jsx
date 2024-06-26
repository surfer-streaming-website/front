import React, { useState } from "react";
import axios from "axios";
import {
  logInByRefreshToken,
  authExceptionHandler,
} from "../../../components/auth/AuthUtil";
import { useNavigate } from "react-router-dom";

const CreateArtistApplication = () => {
  const [formValues, setFormValues] = useState({
    locationType: "", 
    sector: "", 
    copyrightName: "",
    albumName: "",
    artistName: "",
    authorName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      await logInByRefreshToken();
    }
    try {
      const accessToken = localStorage.getItem("accessToken")
      await axios.post(
        "http://localhost:8080/api/v1/auth/artist-application",
        {
          locationType: formValues.locationType,
          sector: formValues.sector,
          copyrightName: formValues.copyrightName,
          albumName: formValues.albumName,
          artistName: formValues.artistName,
          authorName: formValues.authorName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      alert("아티스트 응모 신청이 완료되었습니다.");
      navigate('/auth/artist-application');
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        authExceptionHandler(error, handleSubmit);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="artist-application-update-container">
      <div className="artist-application-update-body">
      <h1>아티스트 응모 신청</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>국내외 구분:</label>
          <label>
            <input
              type="radio"
              name="locationType"
              value="국내"
              checked={formValues.locationType === "국내"}
              onChange={handleChange}
              required
            />
            국내
          </label>
          <label>
            <input
              type="radio"
              name="locationType"
              value="국외"
              checked={formValues.locationType === "국외"}
              onChange={handleChange}
              required
            />
            국외
          </label>
        </div>
        <div>
          <label>부문:</label>
          <label>
            <input
              type="radio"
              name="sector"
              value="대중"
              checked={formValues.sector === "대중"}
              onChange={handleChange}
              required
            />
            대중
          </label>
          <label>
            <input
              type="radio"
              name="sector"
              value="클래식"
              checked={formValues.sector === "클래식"}
              onChange={handleChange}
              required
            />
            클래식
          </label>
          <label>
            <input
              type="radio"
              name="sector"
              value="순수"
              checked={formValues.sector === "순수"}
              onChange={handleChange}
              required
            />
            순수
          </label>
          <label>
            <input
              type="radio"
              name="sector"
              value="국악"
              checked={formValues.sector === "국악"}
              onChange={handleChange}
              required
            />
            국악
          </label>
          <label>
            <input
              type="radio"
              name="sector"
              value="동요"
              checked={formValues.sector === "동요"}
              onChange={handleChange}
              required
            />
            동요
          </label>
          <label>
            <input
              type="radio"
              name="sector"
              value="종교"
              checked={formValues.sector === "종교"}
              onChange={handleChange}
              required
            />
            종교
          </label>
        </div>
        <div>
          <label>저작물명:</label>
          <input
            type="text"
            name="copyrightName"
            value={formValues.copyrightName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>앨범명:</label>
          <input
            type="text"
            name="albumName"
            value={formValues.albumName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>가수명:</label>
          <input
            type="text"
            name="artistName"
            value={formValues.artistName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>저작자명:</label>
          <input
            type="text"
            name="authorName"
            value={formValues.authorName}
            onChange={handleChange}
            required
          />
        </div>
        <button className="artist-application-button" type="submit">신청 제출</button>
      </form>
      </div>
    </div>
  );
};

export default CreateArtistApplication;
