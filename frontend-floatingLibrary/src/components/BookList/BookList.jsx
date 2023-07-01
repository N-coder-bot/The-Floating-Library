/* eslint-disable react/prop-types */
import BookCard from "../BookCard/BookCard";
import styles from "./BookList.module.css";

function BookList({ books, onDelete }) {
  return (
    <>
      <div className={styles.container}>
        {books.map((book) => {
          return <BookCard book={book} key={book._id} onDelete={onDelete} />;
        })}
      </div>
    </>
  );
}

export default BookList;
