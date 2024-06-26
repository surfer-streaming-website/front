import { useContext, useState } from "react";
import { LogingedContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css"

const Navigtion = () => {

  const navigate = useNavigate();

  let logingedCon = useContext(LogingedContext);
  const [click, setClick] = useState(false);
  
  const myPageClick = () => {
    navigate('/user/mypage');
  }
  const onClick = ()=>{
    setClick(!click);
  }

    return (
      <div className="Navigtion">
        <Link className="text-1" to={"/"}>SURFER</Link>
        
        <button className="button">
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
              <button className="myPage" onClick={myPageClick}>마이페이지</button>
              <button>플레이리스트</button>
              <button>로그아웃</button>
            </div>
            :
            null
            )
            :
            <button className="navButton1">
            <Link to={'/register'} className="text-4">회원가입</Link>
            </button>
          }
        </div>

        <button className="navButton1">
          <p className="text-5">최신앨범</p>
        </button>

        <button className="navButton1">
          <p className="text-5">장르</p>
        </button>

        <button className="navButton1">
          <p className="text-5">아티스트</p>
        </button> 

      </div>
    )
  }

  export default Navigtion;