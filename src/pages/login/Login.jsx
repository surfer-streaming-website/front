import React, { useContext, useState } from "react";
import { LogingedContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  let logingedCon = useContext(LogingedContext);

  const [member, setMember] = useState({
    email: "",
    password: "",
  });
  const changeValue = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const navigator = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault(); //submit 이벤트 막음

    let formData = {
      email: member.email,
      password: member.password
    };
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/auth/sign-in",
      // data: JSON.stringify(formData),
      data: formData,
      headers:{
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        console.log("res = ", res);
        const [, payloadBase64] = res.data.data.accessToken.split('.');
        const decodedPayload = JSON.parse(atob(payloadBase64));
        //인증된 사용자의 정보를 저장
        localStorage.setItem("accessToken", 'Bearer ' + res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        localStorage.setItem("nickname", decodedPayload.nickname);
        

        //App.js에 있는 isLoggedIn 변수를 true 변경한다.
        logingedCon.onLoggedChange(true);

        navigator("/");
      })
      .catch((err) => {
        alert("이메일 또는 비밀번호가 잘못되었습니다.");
        setMember({
          email: "",
          password: "",
        });
      });
  };

  return (
    <div>
      <h3 style={{ padding: "10px" }}>로그인하기 </h3>
      <form onSubmit={submitLogin}>
        <label htmlFor="email">아이디</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={changeValue}
          value={member.email}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={changeValue}
          value={member.password}
        />
        <p />
        <button type="submit">로그인</button>
        <p />
      </form>
    </div>
  );
};

export default Login;
