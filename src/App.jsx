import { useState, createContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/auth/login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/auth/register/Register";
import AdminArtistApplicationsPage from "./pages/admin/artist-application-page/ArtistApplicationPage";
import Navigtion from "./components/Navigation";
import SongBoard from "./pages/song/SongBoard";
import AlbumBoard from "./pages/album/AlbumBoard";
import AdminArtistApplicationDetail from "./pages/admin/artist-application-detail/ArtistApplicationDetail";
import ArtistApplicationDetail from "./pages/auth/artist-application-detail/ArtistApplicationDetail";
import ArtistApplicationPage from "./pages/auth/artist-application-page/ArtistApplicationPage";
import CreateArtistApplication from "./pages/auth/create-artist-application/CreateArtistApplication";
import UpdateArtistApplication from "./pages/auth/update-artist-application/UpdateArtistApplication";
import MyPage from "./pages/user/mypage/MyPage";
import Search from "./pages/search/Search";

export const LogingedContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if nickname exists in localStorage to determine if user is logged in
    setIsLoggedIn(localStorage.getItem("nickname") !== null);
  }, []);

  const handleLoggedChange = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  // Function to determine if Navigation should be hidden based on current route
  const shouldHideNavigation = () => {
    return location.pathname === "/login" || location.pathname === "/register";
  };

  return (
    <LogingedContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLoggedChange: handleLoggedChange }}
    >
      <div className="main-container">
        {/* <Header /> */}
        {shouldHideNavigation() ? null : <Navigtion className="navigator" />}
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
            <Route
              path="/auth/artist-application/create"
              element={<CreateArtistApplication />}
            />
            <Route
              path="/auth/artist-application/:id/update"
              element={<UpdateArtistApplication />}
            />
            {/* user */}
            <Route path="/user/mypage" element={<MyPage />} />
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
      {shouldHideNavigation() ? null : <Footer />}
    </LogingedContext.Provider>
  );
}

export default App;
