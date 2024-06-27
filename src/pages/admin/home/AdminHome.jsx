// src/pages/admin/home/AdminHome.jsx
import React from 'react';
import './AdminHome.css'; // CSS 파일 임포트
import AdminNavigation from '../../../components/navigation/AdminNavigation'; // AdminNavigation 임포트

const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <AdminNavigation /> {/* AdminNavigation 추가 */}
      <div className="admin-home-content">
        <h1 className="admin-home-text">Surfer 관리자 페이지 홈페이지</h1>
      </div>
    </div>
  );
};

export default AdminHome;
