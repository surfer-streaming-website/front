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
        <p>
          제29회 유재하 음악 경연 대회에서 대상을 수상하며 리스너들에게 이름을 알린 최유리!<br>
          2020년 첫 EP 동그라미를 시작으로 둘이, 우리만은 등의 앨범으로 활발한 활동을 펼쳐나갔다.</br>
          </p>
        <hr></hr>
      </div>
    </div>
  );
};

export default Home;
