import React, { useEffect } from "react";
import styles from "./Profile.module.css";

function Profile() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to view this page");
    }
  }, []);

  return <div>Profile</div>;
}

export default Profile;
