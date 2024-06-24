import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../../Album.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup } from "react-bootstrap";

const AlbumInsert = () => {
  const [albumReq, setAlbumReq] = useState({
    albumTitle: "",
    agency: "",
    albumContent: "",
    albumImage: null,
    releaseDate: "",
    albumState: "",
    memberId: "",
    songEntities: [
      {
        songTitle: "",
        songNumber: 1,
        lyrics: "",
        genre: "",
        songState: "",
        soundSourceName: null,
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
    const producer = [...songwriters, lyricist, arranger].filter(Boolean).join('/');
    setAlbumReq((prevState) => {
      const newState = { ...prevState };
      newState.songEntities[0].producer = producer;
      return newState;
    });
  };




  // const [imagePreview, setImagePreview] = useState(null);
  // const [soundSourceFiles, setSoundSourceFiles] = useState([]);
  // const [multipartfiles, setMutipartFiles] = useState([]);
  const [multipartfiles, setMutipartFiles] = useState();

  const changeValue = (e) => {
    const { name, value } = e.target;
    setAlbumReq({ ...albumReq, [name]: value });
  };
  const changeValue2 = (e) => {
    const { name, value } = e.target;
    const [parentKey, index, childKey] = name.split('.');
    setAlbumReq((prevState) => {
      const newState = { ...prevState };
      newState[parentKey][index][childKey] = value;
      return newState;
    });
  };
  const changeValue3 = (e) => {
    const { name, value } = e.target;
    const [parentKey, index, childKey,index2,childkey2] = name.split('.');
    setAlbumReq((prevState2) => {
      const newState2 = { ...prevState2 };
      newState2[parentKey][index][childKey][index2][childkey2] = value;
      return newState2;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAlbumReq({ ...albumReq, albumImage: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMutipartFiles(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setMutipartFiles(null);
    }
  };

  // const handleSoundSourceChange = (e, index) => {
  //   const file = e.target.files[1];
  //   const newSoundSourceFiles = [...multipartfiles];
  //   newSoundSourceFiles[index] = file;
  //   setMutipartFiles(newSoundSourceFiles);
  // };




  const navigator = useNavigate();

  const submitJoin = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("albumImage", albumReq.albumImage);

    // multipartfiles.forEach((file, index) => {
    //   formData.append(`songEntities[${index}].soundSourceName`, file);
    // });

    const albumData = {
      ...albumReq,
      albumImage: undefined,

      songEntities: albumReq.songEntities.map((song, index) => ({
        ...song,
        soundSourceName: undefined,
      })),
    };

    console.log("albumData", albumData);
    //console.log("songEntities", songEntities);

   // formData.append("album", JSON.stringify(albumData));

   //formData.append("albumImage",   multipartfiles);
    // formData.append("album", new Blob([JSON.stringify(albumData)], { type: "application/json" }));

    // axios
    //   .post("http://localhost:8080/api/album/save", formData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     let errMessage = err.response.data.type + "\n";
    //     errMessage += err.response.data.title + "\n";
    //     errMessage += err.response.data.detail + "\n";
    //     errMessage += err.response.data.status + "\n";
    //     errMessage += err.response.data.instance + "\n";
    //     errMessage += err.response.data.timestamp;
    //     alert(errMessage);
    //   });
  };

  return (
    <div className="album-insert-form">
      <h2>앨범등록</h2>
      <Form onSubmit={submitJoin}>
        <Form.Label htmlFor="albumTitle">앨범 제목</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            id="albumTitle"
            name="albumTitle"
            onChange={changeValue}
          />
        </InputGroup>

        <h4>앨범 이미지</h4>
        {multipartfiles && (
          <div>
            <img
              src={multipartfiles}
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
        <br />

        <h4>가수</h4>
        <Form.Label htmlFor="albumSingerName1">1</Form.Label>
        <Form.Control
          type="text"
          id="albumSingerName1"
          name="albumSingerEntities.0.albumSingerName"
          onChange={changeValue2}
        />
        <br />

        <Form.Label htmlFor="albumSingerName2">2</Form.Label>
        <Form.Control
          type="text"
          id="albumSingerName2"
          name="albumSingerEntities.1.albumSingerName"
          onChange={changeValue2}
        />
        
        
        <Form.Label htmlFor="releaseDate">발매일</Form.Label>
        <Form.Control
          type="text"
          id="releaseDate"
          name="releaseDate"
          onChange={changeValue}
        />

        <Form.Label htmlFor="agency">기획사</Form.Label>
        <Form.Control
          type="text"
          id="agency"
          name="agency"
          onChange={changeValue}
        />
        <br />

        <h4>앨범소개</h4>
        <Form.Label htmlFor="albumContent"></Form.Label>
        <Form.Control
          type="text"
          id="albumContent"
          name="albumContent"
          onChange={changeValue}
        />

        <h3>수록곡</h3>
        <h4>곡제목</h4>

        <Form.Label htmlFor="songTitle">1</Form.Label>
        <Form.Control
          type="text"
          id="songTitle"
          name="songEntities.0.songTitle"
          onChange={changeValue2}
        />
        <br />

        {/* <h4>음원 파일</h4>
        <Form.Label htmlFor="soundSourceName"></Form.Label>
        <Form.Control
          type="file"
          id="soundSourceName"
          name="soundSourceName"
          onChange={(e) => handleSoundSourceChange(e, 1)}
        /> */}
        <br />

        {/*  */}
        <br />
        <Form.Label as="legend">장르</Form.Label>
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
        {/*  */}
       
        <Form.Label as="titlecheck">타이틀</Form.Label>
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
        <Form.Control
          type="text"
          id="lyrics"
          name="songEntities.0.lyrics"
          onChange={changeValue2}
        />

        <h4>가수</h4>
        <Form.Label htmlFor="songSingerName">1</Form.Label>
        <Form.Control
          type="text"
          id="songSingerName"
          name="songEntities.0.songSingerEntities.0.songSingerName"
          onChange={changeValue3}
        />
        <br />

        <Form.Label htmlFor="songSingerName">2</Form.Label>
        <Form.Control
          type="text"
          id="songSingerName"
          name="songEntities.0.songSingerEntities.1.songSingerName"
          onChange={changeValue3}
        />
        <br />

        <h4>작곡가</h4>
        <Form.Label htmlFor="songwriter1">1</Form.Label>
        <Form.Control
          type="text"
          id="songwriter1"
          name="songwriter1"
          value={songwriters[0]}
          onChange={(e) => handleSongwriterChange(e, 0)}
        />
        <br />

        <Form.Label htmlFor="songwriter2">2</Form.Label>
        <Form.Control
          type="text"
          id="songwriter2"
          name="songwriter2"
          value={songwriters[1]}
          onChange={(e) => handleSongwriterChange(e, 1)}
        />
        <br />

        <h4>작사가</h4>
        <Form.Label htmlFor="lyricist">1</Form.Label>
        <Form.Control
          type="text"
          id="lyricist"
          name="lyricist"
          value={lyricist}
          onChange={handleLyricistChange}
        />
        <br />

        <h4>편곡가</h4>
        <Form.Label htmlFor="arranger">1</Form.Label>
        <Form.Control
          type="text"
          id="arranger"
          name="arranger"
          value={arranger}
          onChange={handleArrangerChange}
        />

{/* 
        <h4>작곡가</h4>
        <Form.Label htmlFor="songwriter">1</Form.Label>
        <Form.Control
          type="text"
          id="songwriter"
          name="songwriter"
          onChange={(e) => changeValue(e, "songEntities", 0, "producer")}
        />
        <br />
        <h4>작곡가</h4>
        <Form.Label htmlFor="songwriter">2</Form.Label>
        <Form.Control
          type="text"
          id="songwriter"
          name="songwriter"
          onChange={(e) => changeValue(e, "songEntities", 0, "producer")}
        />
        <br />

        <h4>작사가</h4>
        <Form.Label htmlFor="lyricist">1</Form.Label>
        <Form.Control
          type="text"
          id="lyricist"
          name="lyricist"
          onChange={(e) => changeValue(e, "songEntities", 0, "lyricist")}
        />

        <h4>편곡가</h4>
        <Form.Label htmlFor="arranger">1</Form.Label>
        <Form.Control
          type="text"
          id="arranger"
          name="arranger"
          onChange={(e) => changeValue(e, "songEntities", 0, "arranger")}
        />  */}
        <br />
        <br />

        <br />
        <p>
          <Button variant="primary" type="submit">
            등록완료
          </Button>
        </p>
      </Form>
    </div>
  );
};

export default AlbumInsert;
