import { useState, createContext, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/auth/login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/auth/register/Register";
import AdminArtistApplicationsPage from "./pages/admin/artist-application-page/ArtistApplicationPage";
import Navigtion from "./components/navigation/Navigation";
import SongBoard from "./pages/song/SongBoard";
import AlbumBoard from "./pages/album/AlbumBoard";
import AdminArtistApplicationDetail from "./pages/admin/artist-application-detail/ArtistApplicationDetail";
import ArtistApplicationDetail from "./pages/auth/artist-application-detail/ArtistApplicationDetail";
import ArtistApplicationPage from "./pages/auth/artist-application-page/ArtistApplicationPage";
import CreateArtistApplication from "./pages/auth/create-artist-application/CreateArtistApplication";
import UpdateArtistApplication from "./pages/auth/update-artist-application/UpdateArtistApplication";
import Search from "./pages/search/Search";
import AudioPlayer from "./components/audio/AudioPlayer";

export const LogingedContext = createContext();
export const PlayerContext = createContext(); //음악 재생 상태 관리할 전역 변수
export const AudioContext = createContext(); //오디오 전역 변수

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem("nickname") != null
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);

    console.log("App useEffect isLoggeedIn = ", isLoggedIn);
  });

  const handleLoggedChange = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  const [playing, setPlaying] = useState(false);
  const [audio] = useState(new Audio());
  // const [image, setImage] = useState('');
  // const [songTitle, setSongTitle] = useState('');
  // const [singer, setSinger] = useState('');
  const [songInfo, setSongInfo] = useState();

  return (
    <LogingedContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLoggedChange: handleLoggedChange }}
    >
    <PlayerContext.Provider
      value={{ playing: playing, setPlaying: setPlaying }}
    >
    <AudioContext.Provider
      value={{audio: audio, songInfo: songInfo, setSongInfo: setSongInfo
      }}>
      <div className="main-container">
        {/* <Header /> */}
        <Navigtion className="navigator" />
        <div className="main-content">
          <Routes>
            {/* common */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* admin */}
            <Route
              path="/admin/artist-application"
              element={<AdminArtistApplicationsPage />}
            />
            <Route
              path="/admin/artist-application/:id"
              element={<AdminArtistApplicationDetail />}
            />
            {/* auth */}
            <Route
              path="/auth/artist-application"
              element={<ArtistApplicationPage />}
            />
            <Route
              path="/auth/artist-application/:id"
              element={<ArtistApplicationDetail />}
            />
            <Route path="/auth/artist-application/create" element={<CreateArtistApplication />}/>
            <Route path="/auth/artist-application/:id/update" element={<UpdateArtistApplication />}/>
            {/* song */}
            <Route path="/song/detail/:id" element={<SongBoard />} />
            {/* album */}
            <Route path="/album/detail/:id" element={<AlbumBoard />} />

            <Route path="/search/:keyword" element={<Search />} />

            {/* error */}
            <Route
              path="/*"
              element={
                <div>
                  <h1>404 error</h1>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
      <AudioPlayer/>
      <Footer />
    </AudioContext.Provider>
    </PlayerContext.Provider>
    </LogingedContext.Provider>
  );
}

export default App;
