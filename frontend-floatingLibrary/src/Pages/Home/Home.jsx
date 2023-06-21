/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        About <span className={styles.text}>This Library</span>
      </h2>
      <div className={styles.box}>
        <div className={styles.card}>
          <Link to="/Addbook">
            <p>Book details to be added.</p>
            <hr
              style={{ border: "1px solid black", backgroundColor: "black" }}
            />
            <p>Title:"Thor: The Dark World"</p>
            <p>Author:"Stanlee"</p>
            <p>ISBN:98989810</p>
          </Link>
        </div>
        <p className={styles.cardText}>Add Book.</p>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <Link to="/Addauthor">
            <p>Author details to be added.</p>
            <hr
              style={{ border: "1px solid black", backgroundColor: "black" }}
            />
            <p>First Name: Ricky</p>
            <p>Last Name: Morty</p>
            <p>Dob: 1989-11-06</p>
          </Link>
        </div>
        <p className={styles.cardText}>Add Author.</p>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <Link to="/Addgenre">
            <p>Genre details to be added.</p>
            <hr
              style={{ border: "1px solid black", backgroundColor: "black" }}
            />
            <p>Name: Science Fiction</p>
          </Link>
        </div>
        <p className={styles.cardText}>Add Genre.</p>
      </div>
    </div>
  );
}

export default Home;
