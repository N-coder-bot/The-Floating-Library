import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
function Login() {
  const Detail = {
    username: "",
    password: "",
  };
  const [userDetails, setuserDetails] = useState(Detail);
  const [error, seterror] = useState("");
  const handleChange = (e) => {
    let item = e.target.name;
    let updatedDetails = userDetails;
    updatedDetails[`${item}`] = e.target.value;

    setuserDetails((userDetails) => ({
      ...userDetails,
      ...updatedDetails,
    }));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      seterror("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userDetails);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        userDetails,
        {
          withCredentials: true,
        }
      );
      alert("Submitted successfully!");
      localStorage.setItem("token", response.data.token);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.data.msg === "could not find user") {
          seterror("Could not find user.");
        } else {
          seterror("Invalid password.");
        }
      } else {
        seterror("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login to your Account.</h1>
      <form className={styles.form}>
        <label htmlFor="username" className={styles.label}>
          <span>Name</span>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={userDetails.name}
            placeholder="Username"
            required
          />
        </label>
        <label htmlFor="password" className={styles.label}>
          <span>Password</span>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userDetails.password}
            placeholder="Password"
            required
          />
        </label>
        <button onClick={handleSubmit} className={styles.button}>
          Login
        </button>
      </form>
      {error.length !== 0 && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default Login;
