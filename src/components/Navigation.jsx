import { Link } from "react-router-dom";
import "../style.css"
import { useContext } from "react";
import { LogingedContext } from "../App";

const Navigtion = () => {

  let logingedCon = useContext(LogingedContext);

    return (
      <div className="Navigtion">
        <p className="text-1">SURFER</p>
        
        <button className="button">
          <p className="text-2">🔎 검색</p>
        </button>

        <div>
          {
            logingedCon.isLoggedIn ? 
            <div className="memberBox">
              <p className="nickname">님 로그인</p>
            </div>
            :
            <button className="button2">
              <Link className="login" to={"/login"}>로그인</Link>
            </button>
          }
        </div>

        <div className="navButton1">
          <p className="text-4">비밀번호 찾기/회원가입/이용권 구매</p>
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