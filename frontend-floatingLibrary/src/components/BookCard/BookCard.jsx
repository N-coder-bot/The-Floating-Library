/* eslint-disable react/prop-types */
import styles from "./BookCard.module.css";
import { useState } from "react";

import axios from "axios";
function BookCard({ book, onDelete }) {
  const [showFullSummary, setShowFullSummary] = useState({});
  const { title, author, _id, summary, isbn, genre } = book;
  const [display, setDisplay] = useState("flex");
  const card = document.getElementsByClassName(`${styles.card}`);
  console.log(card);
  return (
    <div className={styles.card} key={_id} style={{ display: display }}>
      <ul className={styles.cardList}>
        <li className={styles.cardListItem}>
          <span>Title: </span>
          <span className={styles.fetched}>{title}</span>
        </li>
        <li className={styles.cardListItem}>
          <span>Author: </span>
          <span className={styles.fetched}>{author.first_name}</span>
        </li>
        <li className={styles.cardListItem}>
          <span>Summary: </span>
          <span className={styles.fetched}>
            {showFullSummary[_id] ? (
              <div className={styles.showmore}>{summary}</div>
            ) : (
              `${book.summary.slice(0, 10)}...`
            )}
          </span>
        </li>
        <button
          className={styles.btn}
          onClick={() =>
            setShowFullSummary((prevState) => ({
              ...prevState,
              [_id]: !prevState[_id],
            }))
          }
        >
          {showFullSummary[_id] ? "Show Less" : "Show More..."}
        </button>
        <li className={styles.cardListItem}>
          <span>Genre: </span>
          <span className={styles.fetched}>{genre[0].name}</span>
        </li>
        <li className={styles.cardListItem}>
          <span>ISBN: </span>
          <span className={styles.fetched}>{isbn}</span>
        </li>
      </ul>
      <button
        type="button"
        className={styles.delete}
        onClick={async () => {
          setDisplay("none");
          await axios.delete(
            `http://localhost:8000/catalog/book/delete/${_id}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            }
          );
          onDelete();
        }}
      >
        X
      </button>
    </div>
  );
}

export default BookCard;
