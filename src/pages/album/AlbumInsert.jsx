import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../../Album.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup } from "react-bootstrap";

const AlbumInsert = () => {
  //
  const [member, setMember] = useState({
    id: "",
    name: "",
    pwd: "",
    address: "",
  });

  // 중복체크 결과 값을 저장 할 idCheckResult
  const [idCheckResult, setIdCheckResult] = useState("");

  // 아이디 중복여부에 따른 css 를 적용하기 위해 상태 변수
  const [isCheckResult, setIsCheckResult] = useState(false);

  //각 text 박스에 값이 변경되었을 때
  const changeValue = (e) => {
    //console.log(e.target.name +" = "+ e.target.value);
    setMember(
      { ...member, [e.target.name]: e.target.value } //key이름을 가지고 올때는 [e.target.name]처럼 [] 대괄호를 사용
    );
    //console.log(member)
    //id 입력박스에 값이 입력될때다 axios를 이용해서 비동기통신 - 중복여부 체크
    if (e.target.name === "id" && e.target.value !== "") {
      axios({
        method: "GET",
        url: "http://localhost:9000/members/" + e.target.value,
        // data : {"id" : e.target.value},
      })
        .then((res) => {
          //console.log(res);
          setIdCheckResult(res.data);
          res.data === "중복입니다"
            ? setIsCheckResult(true)
            : setIsCheckResult(false);
        })
        .catch((err) => {
          //실패
          let errMessage = err.response.data.type + "\n";
          errMessage += err.response.data.title + "\n";
          errMessage += err.response.data.detail + "\n";
          errMessage += err.response.data.status + "\n";
          errMessage += err.response.data.instance + "\n";
          errMessage += err.response.data.timestamp;
          alert(errMessage);
        });
    }
  };

  //가입하기
  const navigator = useNavigate();

  const submitJoin = (e) => {
    axios({
      method: "POST",
      url: "http://localhost:9000/members",
      data: member,
    })
      .then((res) => {
        console.log(res);
        navigator("/");
      })
      .catch((err) => {
        console.log(err);
        let errMessage = err.response.data.type + "\n";
        errMessage += err.response.data.title + "\n";
        errMessage += err.response.data.detail + "\n";
        errMessage += err.response.data.status + "\n";
        errMessage += err.response.data.instance + "\n";
        errMessage += err.response.data.timestamp;
        alert(errMessage);
      });
  };

  return (
    <div className="album-insert-form">
      <h2 style={{ padding: "20px" }}>앨범등록</h2>
      <Form>
        <Form.Label htmlFor="id">앨범 제목</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control type="text" id="id" name="id" onChange={changeValue} />
          <InputGroup.Text
            style={isCheckResult ? { color: "red" } : { color: "blue" }}
          >
            {idCheckResult}
          </InputGroup.Text>
        </InputGroup>
        <Form.Label htmlFor="name">1</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />
        <br />
        <Form.Label htmlFor="name">2</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />
        <br />

        <Form.Label htmlFor="pwd">발매일</Form.Label>
        <Form.Control
          type="password"
          id="pwd"
          name="pwd"
          onChange={changeValue}
        />
        <Form.Label htmlFor="pwd">기획사</Form.Label>
        <Form.Control
          type="password"
          id="pwd"
          name="pwd"
          onChange={changeValue}
        />
        <br />
        <h4>앨범소개</h4>
        <Form.Label htmlFor="address"></Form.Label>
        <Form.Control
          type="text"
          id="address"
          name="address"
          onChange={changeValue}
        />
        <h3>수록곡</h3>
        <h4>곡제목</h4>

        <Form.Label htmlFor="name">1</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />

        <h4>음원파일</h4>
        <Form.Label htmlFor="name"></Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />
        <h4>가사</h4>
        <Form.Label htmlFor="address"></Form.Label>
        <Form.Control
          type="text"
          id="address"
          name="address"
          onChange={changeValue}
        />
        <h4>가수</h4>
        <Form.Label htmlFor="name">1</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />
        <br />
        <Form.Label htmlFor="name">2</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />
        <h4>작곡가</h4>
        <Form.Label htmlFor="name">1</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />
        <br />
        <Form.Label htmlFor="name">2</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />
        <h4>편곡가</h4>
        <Form.Label htmlFor="name">1</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />
        <br />
        <Form.Label htmlFor="name">2</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        />
        <p>
          <Button variant="primary" onClick={submitJoin}>
            등록완료
          </Button>
        </p>
      </Form>
    </div>
  );
};
export default AlbumInsert;
