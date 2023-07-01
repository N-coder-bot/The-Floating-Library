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
        "http://localhost:8000/users/user/books",
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
  // const [books, setBooks] = useState([
  //   {
  //     _id: "649ebf64c7ba177fb877f2d2",
  //     title: "lorem Ipsum infinity",
  //     author: {
  //       _id: "649ebf3cc7ba177fb877f2c5",
  //       first_name: "Anonymous",
  //       family_name: "unknown",
  //       date_of_birth: null,
  //       date_of_death: null,
  //       book: [],
  //       __v: 0,
  //     },
  //     summary: "yes that's right",
  //     isbn: "649ebf64c7ba177fb877f2d2",
  //     genre: [
  //       {
  //         _id: "649ebf49c7ba177fb877f2cc",
  //         name: "Random",
  //         __v: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "649ebfa6c7ba177fb877f2de",
  //     title: "lekin this is different",
  //     author: {
  //       _id: "649ebf3cc7ba177fb877f2c5",
  //       first_name: "Anonymous",
  //       family_name: "unknown",
  //       date_of_birth: null,
  //       date_of_death: null,
  //       book: [],
  //       __v: 0,
  //     },
  //     summary: "yeah",
  //     isbn: "649ebfa6c7ba177fb877f2de",
  //     genre: [
  //       {
  //         _id: "649ebf49c7ba177fb877f2cc",
  //         name: "Random",
  //         __v: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "649ee925fca6ac60b561a025",
  //     title: "Mysterious Island",
  //     author: {
  //       _id: "649ee8a0fca6ac60b561a00f",
  //       first_name: "ARCHER",
  //       family_name: "BOWMAN",
  //       date_of_birth: null,
  //       date_of_death: null,
  //       book: [],
  //       __v: 0,
  //     },
  //     summary:
  //       "This Island is mysterious, from the origin of you know what to the place you know who.",
  //     isbn: "649ee925fca6ac60b561a025",
  //     genre: [
  //       {
  //         _id: "649ee8f5fca6ac60b561a01f",
  //         name: "Serious",
  //         __v: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "649ee951fca6ac60b561a02c",
  //     title: "Pigeon's Tale",
  //     author: {
  //       _id: "649ee8bcfca6ac60b561a013",
  //       first_name: "ALBAN",
  //       family_name: "STEPHENSON",
  //       date_of_birth: null,
  //       date_of_death: null,
  //       book: [],
  //       __v: 0,
  //     },
  //     summary:
  //       "Love story about two pigeons coming from opposite side of the countries, totally stranger to their new world.",
  //     isbn: "649ee951fca6ac60b561a02c",
  //     genre: [
  //       {
  //         _id: "649ee8dffca6ac60b561a016",
  //         name: "Romance",
  //         __v: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "649ee985fca6ac60b561a033",
  //     title: "Brief History of Time",
  //     author: {
  //       _id: "649ee883fca6ac60b561a00b",
  //       first_name: "ADOLF ",
  //       family_name: "FELDT",
  //       date_of_birth: null,
  //       date_of_death: null,
  //       book: [],
  //       __v: 0,
  //     },
  //     summary:
  //       "everything from the dawn of the universe till the end of it, this book discusses the regime of time and it's beauty.",
  //     isbn: "649ee985fca6ac60b561a033",
  //     genre: [
  //       {
  //         _id: "649ee8eafca6ac60b561a01c",
  //         name: "Drama",
  //         __v: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "649ee985fca6ac60b561a033",
  //     title: "Brief History of Time",
  //     author: {
  //       _id: "649ee883fca6ac60b561a00b",
  //       first_name: "ADOLF ",
  //       family_name: "FELDT",
  //       date_of_birth: null,
  //       date_of_death: null,
  //       book: [],
  //       __v: 0,
  //     },
  //     summary:
  //       "everything from the dawn of the universe till the end of it, this book discusses the regime of time and it's beauty.",
  //     isbn: "649ee985fca6ac60b561a033",
  //     genre: [
  //       {
  //         _id: "649ee8eafca6ac60b561a01c",
  //         name: "Drama",
  //         __v: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  // ]);
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
        {!toggle ? <BookList books={books} onDelete={fetchBooks} /> : <></>}
      </div>
      <div className={styles.profileContainer}>
        <ProfileDisplay user={user} />
      </div>
    </div>
  );
}

export default Profile;
