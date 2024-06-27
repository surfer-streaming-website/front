import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";


const Register = () => {
  //
  const [member, setMember] = useState({
    email: "",
    name: "",
    password: "",
    nickname: "",
  });

  const changeValue = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  }; 
  
  const navigator = useNavigate();

  //가입하기
  const submitJoin = (e) => {
    e.preventDefault();
    let formData = {
      email: member.email,
      password: member.password,
      name: member.name,
      nickname: member.nickname,
    };
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/auth/sign-up",
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        navigator("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      <form onSubmit={submitJoin} className="register-form">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          value={member.email}
          onChange={changeValue}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={member.password}
          onChange={changeValue}
        />
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          value={member.name}
          onChange={changeValue}
        />
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={member.nickname}
          onChange={changeValue}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Register;
