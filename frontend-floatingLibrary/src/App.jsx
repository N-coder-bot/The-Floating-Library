import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Addbook from "./Pages/AddBook/Addbook";
import AddAuthor from "./Pages/AddAuthor/AddAuthor";
import Profile from "./Pages/Profile/Profile";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
import "./assests/fonts/SF-Pro-Display-Thin.ttf";
import "./assests/fonts/SF-Pro-Display-Black.ttf";
import "./assests/fonts/SF-Pro-Display-Medium.ttf";
import "./assests/fonts/SF-Pro-Display-Light.ttf";
import AddGenre from "./Pages/AddGenre/AddGenre";
import Login from "./Pages/Login/Login";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext, UserProvider } from "./contexts/UserContext";

function App() {
  const user = useContext(UserContext);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    // console.log(user);
    if (user) setLogged(true);
    else setLogged(false);
  }, [user]);
  console.log("hi from App");
  return (
    <Router>
      <div className={styles.header}>
        <h1 id={styles.title}>The Floating Library</h1>
        <div className={styles.options}>
          <Link to="/">Home</Link>
          {!logged ? (
            <>
              <Link to="/Login">Login</Link>
              <Link to="/SignUp">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/Profile">Profile</Link>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location = "/";
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/SignUp" element={<Signup />} />
        {logged ? (
          <>
            <Route exact path="/Addbook" element={<Addbook />} />
            <Route exact path="/Addauthor" element={<AddAuthor />} />
            <Route exact path="/Addgenre" element={<AddGenre />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route path="*" element={<Unauthorized />} />
          </>
        ) : (
          <>
            <Route exact path="/Login" element={<Login />} />
            <Route path="*" element={<Unauthorized />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
