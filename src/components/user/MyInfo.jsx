import React from 'react';
import { Link } from 'react-router-dom';
const MyInfo = () => {
  
  return (
    <div className='menus'>
      <Link to='/auth/artist-application'>가수 신청 내역 보기</Link><br />
      <Link>내 정보 수정</Link>
    </div>
  );
};

export default MyInfo;