import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Addbook from "./Pages/AddBook/Addbook";
import AddAuthor from "./Pages/AddAuthor/AddAuthor";

import "./assests/fonts/SF-Pro-Display-Thin.ttf";
import "./assests/fonts/SF-Pro-Display-Black.ttf";
import "./assests/fonts/SF-Pro-Display-Medium.ttf";
import "./assests/fonts/SF-Pro-Display-Light.ttf";
import AddGenre from "./Pages/AddGenre/AddGenre";
import Login from "./Pages/Login/Login";
function App() {
  const changeThemeHome = () => {
    var r = document.querySelector(":root");
    r.style.setProperty("--header", "burlywood");
    r.style.setProperty("--hover", "#214778");
    r.style.setProperty("--background", "black");
  };
  const changeThemeSignUp = () => {
    var r = document.querySelector(":root");
    r.style.setProperty("--header", "black");
    r.style.setProperty("--hover", "white");
    r.style.setProperty("--background", "#214778");
  };
  return (
    <Router>
      <div className={styles.header}>
        <h1 id={styles.title}>The Floating Library</h1>
        <div className={styles.options}>
          <Link to="/" onClick={changeThemeHome}>
            Home
          </Link>
          <Link to="/Login">Login</Link>
          <Link to="/SignUp" onClick={changeThemeSignUp}>
            Signup
          </Link>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/SignUp" element={<Signup />}></Route>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route exact path="/Addbook" element={<Addbook />}></Route>
        <Route exact path="/Addauthor" element={<AddAuthor />}></Route>
        <Route exact path="/Addgenre" element={<AddGenre />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
