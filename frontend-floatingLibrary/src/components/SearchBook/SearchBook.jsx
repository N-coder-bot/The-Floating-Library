/* eslint-disable react/prop-types */
import BookCard from "../BookCard/BookCard";
import styles from "./SearchBook.module.css";
import { useState } from "react";

function SearchBook({ books }) {
  const [found, setFound] = useState([]);

  const handleSearch = (e) => {
    const searchTitle = e.target.value.toLowerCase();
    const booksFound = books.filter((book) =>
      book.title.toLowerCase().includes(searchTitle)
    );
    setFound(booksFound);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search By Title"
        onChange={handleSearch}
      />
      <div className={styles.bookDisplay}>
        {found.map((book) => {
          return <BookCard book={book} key={book._id} />;
        })}
      </div>
    </div>
  );
}

export default SearchBook;
