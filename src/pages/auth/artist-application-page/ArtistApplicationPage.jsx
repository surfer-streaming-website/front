import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import {logInByRefreshToken, authExceptionHandler} from "../../../components/auth/AuthUtil";
import { useNavigate } from "react-router-dom";

const ArtistApplicationPage = () => {
  const [artistApplications, setArtistApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10); // 페이지당 항목 수
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage]); 
  const navigate = useNavigate();
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
        `http://localhost:8080/api/v1/auth/artist-application?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      setArtistApplications(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
      setTotalItemsCount(response.data.data.totalElements);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        authExceptionHandler(error, fetchData);
      } else {
        console.log(error);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1); 
  };

  const handleClick = (id) => {
    navigate(`./${id}`);
  };

  return (
    <div>
      <h1>Artist Applications</h1>
      <ul>
        {artistApplications.map((application) => (
          <li key={application.artistApplicationId} onClick={() => handleClick(application.artistApplicationId)}>
            <div>Application ID: {application.artistApplicationId}</div>
            <div>
              Created At: {new Date(application.createAt).toLocaleString()}
            </div>
            <div>Status: {application.status}</div>
          </li>
        ))}
      </ul>
      <Pagination
        activePage={currentPage + 1} // 페이지 번호는 1부터 시작하므로 +1 처리
        itemsCountPerPage={pageSize}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        prevPageText={"‹"}
        nextPageText={"›"}
      />
    </div>
  );
};

export default ArtistApplicationPage;
