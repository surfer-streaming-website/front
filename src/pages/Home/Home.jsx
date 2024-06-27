import React from 'react';
import './Home.css';
import logo from '../../assets/images/logo.png';
import newsImage1 from '../../assets/images/main1.jpg';

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo">
        <h1>SURFER</h1>
        <h4>인디 음악 스트리밍 사이트</h4>
        <img src={logo} alt="SURFER Logo" />
      </div>
      <div className="latest-news">
        <h1>최신 소식</h1>
        <h1>...</h1>
        <h1>떠오르는 싱어송라이터 최유리</h1>
        <img src={newsImage1} alt="Latest News" className="news-image1" />
        <p></p>
        <hr></hr>
      </div>
    </div>
  );
};

export default Home;
