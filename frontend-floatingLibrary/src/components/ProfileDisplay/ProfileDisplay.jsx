/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./ProfileDisplay.module.css";
import axios from "axios";
function ProfileDisplay({ user }) {
  const [toggle1, setToggle1] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" && password === "") {
      setError("Atleast one field must not be empty");

      return;
    } else {
      try {
        const data = { username, password };
        await axios.put(
          `https://the-floating-library-server-production.up.railway.app/users/updateUser/${user._id}`,
          data,
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        if (error.response.data.msg === "ALREADY EXISTS!") {
          setError("Username Already Exists, try different name");
        }
      }
    }
  };
  return (
    <>
      <h1 className={styles.title}>Hey {`${user.username}`} :) </h1>
      <div className={styles.options}>
        {!toggle1 && (
          <button
            type="button"
            className={styles.btn}
            onClick={() => setToggle1(true)}
          >
            Edit Credentials
          </button>
        )}
        {toggle1 && (
          <>
            <button
              type="button"
              className={styles.btn}
              onClick={() => setToggle1(false)}
              id={styles.goback}
            >
              {`<-`}
            </button>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.wrapper}>
                <label htmlFor="username" className={styles.credentials}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={styles.wrapper}>
                <label htmlFor="password" className={styles.credentials}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className={styles.btn} type="submit">
                Save Changes
              </button>
            </form>
          </>
        )}
        {error.length !== 0 && <div className={styles.error}>{error}</div>}
      </div>
    </>
  );
}

export default ProfileDisplay;
