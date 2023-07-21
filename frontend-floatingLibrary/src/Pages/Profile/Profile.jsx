import { useContext, useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { UserContext } from "../../contexts/UserContext";
import BookList from "../../components/BookList/BookList";
import ProfileDisplay from "../../components/ProfileDisplay/ProfileDisplay";
import SearchBook from "../../components/SearchBook/SearchBook";
import axios from "axios";
function Profile() {
  const user = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const [books, setBooks] = useState([]);
  // Fetch Books from the server.
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://the-floating-library-server-production.up.railway.app/users/user/books",
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setBooks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className={styles.container}>
      <div className={styles.booksContainer}>
        <div
          style={{
            display: "Flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <h1>{toggle ? `Search Books` : `Books record`}</h1>
          <button className={styles.btn} onClick={handleToggle}>
            {toggle ? `<-` : `Search`}
          </button>
        </div>
        {toggle ? <SearchBook books={books} /> : <></>}
        {books.length === 0 ? (
          <p className={styles.tag}>Please add atleast one book.</p>
        ) : (
          <></>
        )}
        {!toggle ? <BookList books={books} onDelete={fetchBooks} /> : <></>}
      </div>
      <div className={styles.profileContainer}>
        <ProfileDisplay user={user} />
      </div>
    </div>
  );
}

export default Profile;
