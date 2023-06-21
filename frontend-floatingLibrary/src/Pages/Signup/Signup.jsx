import React, { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
function Signup() {
  const Detail = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userDetails, setuserDetails] = useState(Detail);

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
    await axios.post("http://localhost:5000/users", userDetails);
    alert("Submitted successfully!");
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Make an account, go ahead it's free</h1>
      <form className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={userDetails.name}
          />
        </label>
        <label htmlFor="email" className={styles.label}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={userDetails.email}
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
    </div>
  );
}

export default Signup;
