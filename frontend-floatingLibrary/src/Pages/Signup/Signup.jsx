import React, { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
function Signup() {
  const Detail = {
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [userDetails, setuserDetails] = useState(Detail);
  const [error, seterror] = useState(false);
  const handleChange = (e) => {
    let item = e.target.name;
    console.log(item);
    let updatedDetails = userDetails;
    updatedDetails[`${item}`] = e.target.value;

    setuserDetails((userDetails) => ({
      ...userDetails,
      ...updatedDetails,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.confirmPassword) {
      seterror(true);
    } else {
      console.log(userDetails);
      await axios.post("http://localhost:8000/users/signUp", userDetails);
      alert("Submitted successfully!");
      window.location.reload();
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Make an account, go ahead its free</h1>
      <form className={styles.form}>
        <label htmlFor="username" className={styles.label}>
          <span>Name</span>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={userDetails.username}
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
        <label htmlFor="confirmPassword" className={styles.label}>
          <span>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={userDetails.confirmPassword}
          />
        </label>
        <button onClick={handleSubmit} className={styles.button}>
          Sign Up
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

export default Signup;
