import { useState, createContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/auth/login/Login';
import Home from './pages/Home/Home';
import Register from './pages/auth/register/Register';
import AdminArtistApplicationsPage from './pages/admin/artist-application-page/ArtistApplicationPage';
import Navigtion from './components/navigation/Navigation';
import SongBoard from './pages/song/SongBoard';
import AlbumBoard from './pages/album/AlbumBoard';
import AdminArtistApplicationDetail from './pages/admin/artist-application-detail/ArtistApplicationDetail';
import ArtistApplicationDetail from './pages/auth/artist-application-detail/ArtistApplicationDetail';
import ArtistApplicationPage from './pages/auth/artist-application-page/ArtistApplicationPage';
import CreateArtistApplication from './pages/auth/create-artist-application/CreateArtistApplication';
import UpdateArtistApplication from './pages/auth/update-artist-application/UpdateArtistApplication';
import Search from './pages/search/Search';
import AudioPlayer from './components/audio/AudioPlayer';
import AlbumList from './pages/admin/album/AlbumList';
import AdminHome from './pages/admin/home/AdminHome';

export const LogingedContext = createContext();
export const PlayerContext = createContext(); //음악 재생, 오디오 상태 관리
export const PlaylistContext = createContext(); //플레이리스트 관리

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem('nickname') != null
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);

    console.log('App useEffect isLoggeedIn = ', isLoggedIn);
  });

  const handleLoggedChange = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  const [playing, setPlaying] = useState(false);
  const [audio] = useState(new Audio());
    
  const [songInfo, setSongInfo] = useState(()=>{
    const storedSongInfo = JSON.parse(localStorage.getItem('songInfo')) || [];
    return storedSongInfo;
  });

  useEffect(()=>{
    localStorage.setItem('songInfo',JSON.stringify(songInfo));
  },[songInfo]);

  const [isVisible, setIsVisible] = useState(false); //플레이리스트 가시성 관리
  
  //플레이리스트 노래 목록
  const [musicList, setMusicList] = useState(()=>{
    const storedMusicList = JSON.parse(localStorage.getItem('surfer_player')) || [];
    return storedMusicList;
  })

  //로컬스토리지에 음악 재생 리스트에 관한 정보를 저장
  useEffect(()=>{
    localStorage.setItem('surfer_player',JSON.stringify(musicList));
  },[musicList])

  return (
    <LogingedContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLoggedChange: handleLoggedChange }}
    >
    <PlayerContext.Provider
      value={{ playing: playing, setPlaying: setPlaying, audio: audio, songInfo: songInfo, setSongInfo: setSongInfo}}
    >
    <PlaylistContext.Provider
      value={{musicList: musicList, setMusicList: setMusicList, isVisible: isVisible, setIsVisible: setIsVisible}}>
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
            <Route path="/admin/album/AlbumList" element={<AlbumList />} />
            <Route path="/admin/home/AdminHome" element={<AdminHome />} />
            {/* auth */}
            <Route
              path="/auth/artist-application"
              element={<ArtistApplicationPage />}
            />
            <Route
              path="/auth/artist-application/:id"
              element={<ArtistApplicationDetail />}
            />
            <Route
              path="/auth/artist-application/create"
              element={<CreateArtistApplication />}
            />
            <Route
              path="/auth/artist-application/:id/update"
              element={<UpdateArtistApplication />}
            />
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
    </PlaylistContext.Provider>
    </PlayerContext.Provider>
    </LogingedContext.Provider>
  );
}

export default App;
