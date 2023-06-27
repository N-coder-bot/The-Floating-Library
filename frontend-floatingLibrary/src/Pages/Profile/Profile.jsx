import { useContext } from "react";
import styles from "./Profile.module.css";
import { UserContext } from "../../contexts/UserContext";

function Profile() {
  const user = useContext(UserContext);
  return (
    <div className={styles.container}>
      <div className={styles.booksContainer}>{console.log(user)};</div>
      <div className={styles.profileContainer}></div>
    </div>
  );
}

export default Profile;
