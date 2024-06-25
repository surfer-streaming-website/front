// src/components/navigation/AdminNavigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavigation.css'; // CSS 파일 임포트

const AdminNavigation = () => {
  return (
    <div className="admin-navigation">
      <div className="logo">
        <Link to="/" className="logo-text">
          SURFER 관리자
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/admin/home/AdminHome" className="nav-link">
          홈페이지
        </Link>
        <Link to="/admin/album/AlbumList" className="nav-link">
          앨범 조회
        </Link>
      </nav>
    </div>
  );
};

export default AdminNavigation;
