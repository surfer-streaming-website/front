import { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/auth/login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/auth/register/Register";
import ArtistApplicationsPage from "./pages/admin/artist-application-page/ArtistApplicationPage";
import Navigtion from "./components/Navigation";
import SongBoard from "./pages/song/SongBoard";
import AlbumBoard from "./pages/album/AlbumBoard";
import ArtistApplicationDetail from "./pages/admin/artist-application-detail/ArtistApplicationDetail";
import Search from "./pages/search/Search";

export const LogingedContext = createContext();

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

  return (
    <LogingedContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLoggedChange: handleLoggedChange }}
    >
      <div className="main-container">
        {/* <Header /> */}
        <Navigtion className="navigator" />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin/artist-application"
              element={<ArtistApplicationsPage />}
            />
            <Route
              path="/admin/artist-application/:id"
              element={<ArtistApplicationDetail />}
            />
            <Route path="/song/detail/:id" element={<SongBoard />} />
            <Route path="/album/detail/:id" element={<AlbumBoard />} />

            <Route path="/search/:keyword" element={<Search />} />

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
      <Footer />
    </LogingedContext.Provider>
  );
}

export default App;
