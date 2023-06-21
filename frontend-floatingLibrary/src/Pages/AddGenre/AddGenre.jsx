import styles from "./AddGenre.module.css";
import { useState } from "react";
import axios from "axios";

function AddGenre() {
  const details = {
    name: "",
  };
  const handleChange = (e) => {
    let updateDetails = genreDetails;
    updateDetails[`${e.target.name}`] = e.target.value;
    setgenreDetails((genreDetails) => ({
      ...genreDetails,
      ...updateDetails,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/catalog/genre/create",
      genreDetails
    );
    alert("Genre Added to Collection Successfully!");
    window.location.reload();
    // console.log(response);
  };
  const [genreDetails, setgenreDetails] = useState(details);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fill this form to ADD a new GENRE</h1>
      <form className={styles.addform} onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span className={styles.labels}>Genre:</span>
          <input
            type="text"
            name="name"
            required={true}
            onChange={handleChange}
            value={genreDetails.name}
            placeholder="Enter New Genre"
          />
        </label>
        <button type="submit" className={styles.button}>
          Add Genre
        </button>
      </form>
    </div>
  );
}

export default AddGenre;
