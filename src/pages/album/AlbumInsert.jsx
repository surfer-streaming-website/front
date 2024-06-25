import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./AlbumInsert.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup } from "react-bootstrap";
import { logInByRefreshToken } from "../../components/auth/AuthUtil";
import { LogingedContext } from "../../App";

const AlbumInsert = () => {
  
  let logingedCon = useContext(LogingedContext);

  useEffect(()=>{
    fetchData();
},[])

  const fetchData = ()=>{
    if (
        !localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
      ){
        logInByRefreshToken();
      }
}




  const [albumReq, setAlbumReq] = useState({
    albumTitle: "",
    agency: "",
    albumContent: "",
    albumImage: "",
    releaseDate: "",
    memberId: "2",
    songEntities: [
      {
        songTitle: "",
        songNumber: 1,
        lyrics: "",
        genre: "",
        songState: "",
        soundSourceName: "",
        producer: "",
        songSingerEntities: [
          {
            songSingerName: "",
          },
          {
            songSingerName: "",
          },
        ],
      },
    ],
    albumSingerEntities: [
      {
        albumSingerName: "",
      },
      {
        albumSingerName: "",
      },
    ],
  });

  const [songwriters, setSongwriters] = useState(["", ""]);
  const [lyricist, setLyricist] = useState("");
  const [arranger, setArranger] = useState("");

  const handleSongwriterChange = (e, index) => {
    const newSongwriters = [...songwriters];
    newSongwriters[index] = e.target.value;
    setSongwriters(newSongwriters);
    updateProducer(newSongwriters, lyricist, arranger);
  };

  const handleLyricistChange = (e) => {
    const value = e.target.value;
    setLyricist(value);
    updateProducer(songwriters, value, arranger);
  };

  const handleArrangerChange = (e) => {
    const value = e.target.value;
    setArranger(value);
    updateProducer(songwriters, lyricist, value);
  };

  const updateProducer = (songwriters, lyricist, arranger) => {
    const producer = [...songwriters, lyricist, arranger]
      .filter(Boolean)
      .join("/");
    setAlbumReq((prevState) => {
      const newState = { ...prevState };
      newState.songEntities[0].producer = producer;
      return newState;
    });
  };

  const [imagePreview, setImagePreview] = useState();
  // const [soundSourceFiles, setSoundSourceFiles] = useState([]);
  const [multipartfiles, setMultipartFiles] = useState([]);
  // const [multipartfiles, setMultipartFiles] = useState();

  const changeValue = (e) => {
    const { name, value } = e.target;
    setAlbumReq({ ...albumReq, [name]: value });
  };
  const changeValue2 = (e) => {
    const { name, value } = e.target;
    const [parentKey, index, childKey] = name.split(".");
    setAlbumReq((prevState) => {
      const newState = { ...prevState };
      newState[parentKey][index][childKey] = value;
      return newState;
    });
  };
  const changeValue3 = (e) => {
    const { name, value } = e.target;
    const [parentKey, index, childKey, index2, childkey2] = name.split(".");
    setAlbumReq((prevState2) => {
      const newState2 = { ...prevState2 };
      newState2[parentKey][index][childKey][index2][childkey2] = value;
      return newState2;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAlbumReq({ ...albumReq, albumImage: file.name });

    const newImage = [...multipartfiles];
    newImage[0] = file;
    setMultipartFiles(newImage);

    if (file) {
      const newImage = [file];
      setMultipartFiles(newImage);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Ensure file is stored in array
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview([]);
    }
  };

  const handleSoundSourceChange = (e) => {
    const file = e.target.files[0]; // 첫 번째 파일만 선택
    if (!file) {
      return; // 파일이 선택되지 않았으면 함수 종료
    }

    // albumReq 업데이트
    setAlbumReq({
      ...albumReq,
      songEntities: [
        {
          ...albumReq.songEntities[0], // 기존 요소 복사
          soundSourceName: file.name, // soundSourceName 속성 업데이트
        },
      ],
    });

    // multipartfiles 업데이트
    const newSoundSourceFiles = [...multipartfiles, file];
    setMultipartFiles(newSoundSourceFiles);
  };

  // const handleSoundSourceChange = (e) => {
  //   const file = e.target.files[1];
  //   setAlbumReq({
  //     ...albumReq,
  //     albumReq.songEntities.soundSourceName: file
  // });

  //   const newSoundSourceFiles = [...multipartfiles];
  //   newSoundSourceFiles[1] = file;
  //   setMultipartFiles(newSoundSourceFiles);
  // };

  // const handleSoundSourceChange = (e, index) => {
  //   const file = e.target.files[1];
  //   setAlbumReq({
  //     ...albumReq,
  //     songEntities: albumReq.songEntities.map((song, i) =>
  //         i === 0 ? { ...song, soundSourceName: file } : song
  //     )
  // });
  //   const newSoundSourceFiles = [...multipartfiles];
  //   newSoundSourceFiles[index] = file;
  //   setMultipartFiles(newSoundSourceFiles);
  // };

  const navigator = useNavigate();

  const submitJoin = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("albumImage", albumReq.albumImage);

    // multipartfiles.forEach((file, index) => {
    //   formData.append(`songEntities[${index}].soundSourceName`, file);
    // });
    multipartfiles.forEach((file, index) => {
      formData.append("multipartfiles", file);

      console.log("이름: " + file.name);
      console.log("크기: " + file.size + " bytes");
      console.log("타입: " + file.type);
    });

    const albumData = {
      ...albumReq,
      // albumImage: undefined,

      songEntities: albumReq.songEntities.map((song, index) => ({
        ...song,
        // soundSourceName: undefined,
      })),
    };

    console.log("albumData", albumData);
    //console.log("songEntities", songEntities);

    // formData.append("album", JSON.stringify(albumData));

    //formData.append("albumImage",   multipartfiles);
    formData.append(
      "album",
      new Blob([JSON.stringify(albumData)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/album/save", formData, {
        headers: {
          "Contest-Type": "multipart/form-data",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
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
    <div className="album-insert-main">

      <h2>앨범 등록 신청</h2>
    <div className="album-insert-form">
      <Form onSubmit={submitJoin}>
       

        <h4>앨범 이미지</h4>
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Album Preview"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          </div>
        )}
        <Form.Label htmlFor="albumImage"></Form.Label>
        <Form.Control
          type="file"
          id="albumImage"
          name="albumImage"
          onChange={handleImageChange}
        />

        <br/>
        <br/>
         <Form.Label htmlFor="albumTitle">앨범 제목</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            id="albumTitle"
            name="albumTitle"
            onChange={changeValue}
          />
        </InputGroup>

        <h4>가수</h4>
        <Form.Label htmlFor="albumSingerName1"></Form.Label>
        <Form.Control
          type="text"
          id="albumSingerName1"
          name="albumSingerEntities.0.albumSingerName"
          onChange={changeValue2}
        />
        <br />
        
        <br />
        
        <span className="album-insert-form-releaseDate">발매일</span>
        <span className="album-insert-form-agency">기획사</span>
        
        <br />

        <Form.Label htmlFor="releaseDate"></Form.Label>
        <Form.Control
          type="text"
          id="releaseDate"
          name="releaseDate"
          onChange={changeValue}
        />

        <Form.Label htmlFor="agency"></Form.Label>
        <Form.Control
        className="album-insert-form-agency-text"
          type="text"
          id="agency"
          name="agency"
          onChange={changeValue}
        />
        <br />

        <h4>앨범소개</h4>
        <Form.Label htmlFor="albumContent"></Form.Label>
        <Form.Control
          className="album-insert-form-albumContent"
          as="textarea"
          rows={10}
          id="albumContent"
          name="albumContent"
          onChange={changeValue}
        />
        <br/>
        <br/>
        <h3>수록곡</h3>

        <div className="album-insert-form-songList">
        <h4>곡제목</h4>

        <Form.Label htmlFor="songTitle"></Form.Label>
        <Form.Control
          type="text"
          id="songTitle"
          name="songEntities.0.songTitle"
          onChange={changeValue2}
        />
        <br />

        <h4>음원 파일</h4>
        <Form.Label htmlFor="soundSourceName"></Form.Label>
        <Form.Control
          type="file"
          id="soundSourceName"
          name="soundSourceName"
          onChange={(e) => handleSoundSourceChange(e, 1)}
        />
        <br />

        {/*  */}
        <br />
        <Form.Label as="legend">장르</Form.Label>
        <br />

        <Form.Check
          type="radio"
          id="ballad"
          label="발라드"
          name="songEntities.0.genre"
          value="발라드"
          onChange={changeValue2}
        />
        <Form.Check
          type="radio"
          id="blues"
          label="블루스"
          name="songEntities.0.genre"
          value="블루스"
          onChange={changeValue2}
        />
        <Form.Check
          type="radio"
          id="R&B"
          label="R&B/소울"
          name="songEntities.0.genre"
          value="R&B/소울"
          onChange={changeValue2}
        />
        <Form.Check
          type="radio"
          id="folk"
          label="포크"
          name="songEntities.0.genre"
          value="포크"
          onChange={changeValue2}
        />
        <Form.Check
          type="radio"
          id="rock"
          label="락"
          name="songEntities.0.genre"
          value="락"
          onChange={changeValue2}
        />
        <Form.Check
          type="radio"
          id="rap"
          label="랩"
          name="songEntities.0.genre"
          value="랩"
          onChange={changeValue2}
        />
        <Form.Check
          type="radio"
          id="electronica"
          label="일렉트로니카"
          name="songEntities.0.genre"
          value="일렉트로니카"
          onChange={changeValue2}
        />
        <br />

        <Form.Label as="legend">타이틀</Form.Label>
        <Form.Check
          type="radio"
          id="true"
          label="타이틀 곡 O"
          name="songEntities.0.songState"
          value="true"
          onChange={changeValue2}
        />
        <Form.Check
          type="radio"
          id="false"
          label="타이틀 곡 X"
          name="songEntities.0.songState"
          value="false"
          onChange={changeValue2}
        />

        {/*  */}
        <br />

        <Form.Label htmlFor="lyrics">가사</Form.Label>
        <br />

        <Form.Control
          className="album-insert-form-song-lyrics"
          as="textarea"
          rows={10}
          id="lyrics"
          name="songEntities.0.lyrics"
          onChange={changeValue2}
        />

        <h4>가수</h4>
        <Form.Label htmlFor="songSingerName"></Form.Label>
        <Form.Control
          type="text"
          id="songSingerName"
          name="songEntities.0.songSingerEntities.0.songSingerName"
          onChange={changeValue3}
        />
        <br />

      
        <br />

        <h4>작곡가</h4>
        <Form.Label htmlFor="songwriter1"></Form.Label>
        <Form.Control
          type="text"
          id="songwriter1"
          name="songwriter1"
          value={songwriters[0]}
          onChange={(e) => handleSongwriterChange(e, 0)}
        />
        <br />

    
        <br />

        <h4>작사가</h4>
        <Form.Label htmlFor="lyricist"></Form.Label>
        <Form.Control
          type="text"
          id="lyricist"
          name="lyricist"
          value={lyricist}
          onChange={handleLyricistChange}
        />
        <br />

        <h4>편곡가</h4>
        <Form.Label htmlFor="arranger"></Form.Label>
        <Form.Control
          type="text"
          id="arranger"
          name="arranger"
          value={arranger}
          onChange={handleArrangerChange}
        />
        </div>


        <br />
        <br />

        <br />
        <p>
          <Button className="album-insert-form-button" type="submit">
            등록완료
          </Button>
        </p>
      </Form>
    </div>
    
    </div>

  );
};

export default AlbumInsert;
