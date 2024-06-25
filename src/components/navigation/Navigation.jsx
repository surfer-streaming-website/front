import { Link ,useNavigate } from "react-router-dom";
import "./Navigation.css"
import { useContext, useState } from "react";
import { LogingedContext } from "../../App";

const Navigtion = () => {


  let logingedCon = useContext(LogingedContext);
  const [click, setClick] = useState(false);

  const onClick = ()=>{
    setClick(!click);
  }

  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };


  const handleButtonClick = () => {
    if (keyword) {
      navigate(`/search/${encodeURIComponent(keyword)}`);
    }

  };
    return (
      <div className="Navigtion">
        <Link className="text-1" to={"/"}>SURFER</Link>
        
        <input
        className="search-text"
        type="text"
        value={keyword}
        onChange={handleInputChange}
      />
        <button className="button" onClick={handleButtonClick}>
          <p className="text-2">🔎 검색</p>
        </button>

        <div>
          {
            logingedCon.isLoggedIn ? 
            <div className="memberBox">
              <p className="nickname">{localStorage.getItem("nickname")}님 로그인</p>
              <button className="setting" onClick={onClick}>⚙️</button>
            </div>
            :
            <button className="button2">
              <Link className="login" to={"/login"}>로그인</Link>
            </button>
          }
        </div>

        <div>
          {
            logingedCon.isLoggedIn ? (
              click ? 
            <div className="memberButton">
              <button className="myPage">마이페이지</button>
              <button>내 이용권</button>
              <button>계정설정</button>
              <button>로그아웃</button>
            </div>
            :
            null
            )
            :
            <div className="navButton1">
              <p className="text-4">비밀번호 찾기/회원가입/이용권 구매</p>
            </div>
          }
        </div>

        <button className="navButton1">
          <p className="text-5">차트</p>
        </button>

        <button className="navButton1">
          <p className="text-5">최신앨범</p>
        </button>

        <button className="navButton1">
          <p className="text-5">장르</p>
        </button>

        <button className="navButton1">
          <p className="text-5">DJ</p>
        </button>

        <button className="navButton1">
          <p className="text-5">아티스트</p>
        </button> 

      </div>
    )
  }

  export default Navigtion;