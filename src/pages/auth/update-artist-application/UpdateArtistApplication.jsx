import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  logInByRefreshToken,
  authExceptionHandler,
} from "../../../components/auth/AuthUtil";
import { useNavigate, useParams } from "react-router-dom";

const UpdateArtistApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    locationType: "",
    sector: "",
    copyrightName: "",
    albumName: "",
    artistName: "",
    authorName: "",
  });
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
      
      setFormValues(() => ({
        locationType: response.data.data.locationType,
        sector: response.data.data.sector,
        copyrightName: response.data.data.copyrightName,
        albumName: response.data.data.albumName,
        artistName: response.data.data.artistName,
        authorName: response.data.data.authorName,
      }));
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        authExceptionHandler(error, fetchData);
      } else {
        console.log(error);
      }
    }
  };

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
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:8080/api/v1/auth/artist-application/${id}`,
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
      alert("수정이 완료되었습니다.");
      navigate(`/auth/artist-application/${id}`);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        authExceptionHandler(error, handleSubmit);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
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
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default UpdateArtistApplication;
