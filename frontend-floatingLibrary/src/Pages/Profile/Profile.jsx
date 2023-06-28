import { useContext, useState } from "react";
import styles from "./Profile.module.css";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

function Profile() {
  const user = useContext(UserContext);
  const [toggle1, setToggle1] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === user.username || password === user.password) {
      setError(true);
    } else {
      try {
        const data = { username, password };
        await axios.post(
          `http://localhost:8000/users/updateUser/${user._id}`,
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
        setError(true);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.booksContainer}>box-1;</div>
      <div className={styles.profileContainer}>
        <h1 className={styles.title}>Hey {`${user.username}`} :) </h1>
        <div className={styles.options}>
          {!toggle1 && (
            <button type="button" onClick={() => setToggle1(true)}>
              Edit Credentials
            </button>
          )}
          {toggle1 && (
            <>
              <form onSubmit={handleSubmit}>
                <div>
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
                <div>
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
                <button type="submit">Save Changes</button>
              </form>
            </>
          )}
          {error && (
            <div className={styles.error}>Error Same Username or Password!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
