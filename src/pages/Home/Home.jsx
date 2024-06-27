import React from 'react';
import './Home.css';
import logo from '../../assets/images/logo.png';
import newsImage1 from '../../assets/images/main1.jpg';
import newsImage2 from '../../assets/images/main2.jpg';
import newsImage3 from '../../assets/images/main3.jpeg';

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-and-title">
        <img src={logo} alt="SURFER Logo" className="logo-image" />
        <div className="title-text">
          <h1>SURFER</h1>
          <h4>인디 음악 스트리밍 사이트</h4>
        </div>
      </div>
      <div className="latest-news">
        <h1>SURFER에서 활동 중인 HOT한 인디 아티스트 소개</h1>
        <h1>...</h1>
        <h1>떠오르는 싱어송라이터 '최유리'</h1>
        <img src={newsImage1} alt="최유리 소식" className="news-image1" />
        <p>
          제29회 유재하 음악 경연 대회에서 대상을 수상하며 리스너들에게 이름을
          알린 최유리는 <br />
          2020년 첫 EP 동그라미를 시작으로 둘이, 우리만은 등의 앨범으로 활발한
          활동을 펼쳐나갔다.
          <br />
        </p>
        <p>
          자신을 향한 물음의 과정과 답을 그려내며 공감을 이루기도, 설렘과
          따뜻함이 녹아있는 사랑을 노래하기도 하며
          <br />
          모두가 공감할 수 있는 곡들로 디스코그라피를 쌓은 그녀는 자작곡으로
          참여한 갯마을 차차차 OST ‘바람’으로
          <br />
          특유의 담담하고도 매력적인 목소리를 들려주며 인지도를 넓혔다.
          <br />
        </p>
        <hr />
        <h1>독특한 청년들, 인디 밴드 '잔나비'</h1>
        <img src={newsImage2} alt="잔나비 소식" className="news-image2" />
        <p>
          밴드 '잔나비'. 1992년 생으로 갓 20대에 들어선 청년 셋이 지은
          신선하면서도 유쾌한 이름,
          <br />
          그게 딱 밴드 '잔나비'였다. 잔나비, 원숭이가 가지고 있는 그 느낌처럼
          분당 동네 친구 정훈(보컬),
          <br />
          도형(기타) 이들은 신나고 즐거우며 솔직한 청춘들이다. 잔나비밴드를
          이야기할 때 빼놓을 수<br />
          없는 것은 [슈퍼스타K5]다. 잔나비밴드는 자신들이 어떤 밴드인지 많은
          사람들에게 알리기 위해
          <br />
          오디션 프로그램을 택했다. 하지만 세 사람 중 정훈만 플랜비에 속해
          본선에 진출했고 TOP7에 올랐다.
          <br />
          다른 두 멤버들의 응원이 있었기에 가능했다.
          <br />
        </p>
        <p>
          밴드 잔나비는 이미 다수의 버스킹 공연과 홍대 클럽 공연을
          펼쳐오며실력을 검증받았으며
          <br />
          2014 펜타슈퍼루키에 선정되는 등 이미 두드러진 활약을 펼치며 존재감을
          과시하고 있다.
          <br />
          밴드 잔나비는 지난 4월 28일 첫 싱글 [로켓트]를 발매해 인디 음악계의
          새로운 돌풍을 일으켰다.
          <br />
        </p>
        <hr />
        <h1>이면의 감수성을 끌어내 청자를 매료시키는 '한로로'</h1>
        <img src={newsImage3} alt="한로로 소식" className="news-image3" />
        <p>
          2023 제20회 한국대중음악상 '올해의 신인'과 '최우수 모던록 노래' 부문에
          노미네이트 되어 음악계에 무서운 존재감을 보이고 있다.
          <br />
          국문학과 전공다운 서정시 같은 가사와 쉽게 잊히지 않는 멜로디를
          선보이며 작사, 작곡에서의 음악적 재능을 입증하였고, <br />
          작은 체구에서 터질 듯 쏟아지는 호소력 짙은 목소리로 청춘을 노래한다.
          락/인디음악을 사랑하는 팬들뿐만 아니라
          <br />
          같은 예술계 동료들로부터 뜨거운 관심을 받고 있는, 앞으로의행보가 몹시
          기대되는 가수!
          <br />
        </p>
      </div>
    </div>
  );
};

export default Home;
