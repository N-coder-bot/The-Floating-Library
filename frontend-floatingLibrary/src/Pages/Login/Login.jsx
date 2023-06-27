import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
function Login() {
  const Detail = {
    username: "",
    password: "",
  };
  const [userDetails, setuserDetails] = useState(Detail);
  const [error, seterror] = useState(false);
  const handleChange = (e) => {
    let item = e.target.name;
    let updatedDetails = userDetails;
    updatedDetails[`${item}`] = e.target.value;

    setuserDetails((userDetails) => ({
      ...userDetails,
      ...updatedDetails,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);
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
    // const token = localStorage.getItem("token");
    // await axios.get("http://localhost:8000/users/protected", {
    //   withCredentials: true,
    //   headers: {
    //     Authorization: `${token}`,
    //   },
    // });
    // console.log(anotherresponse.data);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login to your ccount.</h1>
      <form className={styles.form}>
        <label htmlFor="username" className={styles.label}>
          <span>Name</span>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={userDetails.name}
          />
        </label>
        <label htmlFor="password" className={styles.label}>
          <span>Password</span>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userDetails.password}
          />
        </label>
        <button onClick={handleSubmit} className={styles.button}>
          Login
        </button>
      </form>
      {error && (
        <div className={styles.error}>
          Make sure password and confirm Password are same or try another
          Username.
        </div>
      )}
    </div>
  );
}

export default Login;
