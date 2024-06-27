// src/pages/admin/home/AdminHome.jsx
import React from 'react';
import './AdminHome.css'; // CSS 파일 임포트
import AdminNavigation from '../../../components/navigation/AdminNavigation'; // AdminNavigation 임포트
import monitorImage from '../../../assets/images/monitor.jpg'; // 모니터링 이미지 경로

const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <AdminNavigation /> {/* AdminNavigation 추가 */}
      <div className="admin-home-content">
        <h1 className="admin-home-text">이곳은 SURFER 관리자 페이지입니다!</h1>
        <img src={monitorImage} alt="Monitor" className="monitor-image" />
        <p className="monitor-text">(지켜보고 있다.)</p>
        <div className="status-info">
          <h2>앨범 상태 변경 참고값</h2>
          <p>
            0 : 심사중
            <br />
            1 : 등록 완료
            <br />
            2 : 반려됨
            <br />
            3 : 숨김(삭제)
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
