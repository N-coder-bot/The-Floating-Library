import styles from "./Unauthorized.module.css";
function Unauthorized() {
  return (
    <div className={styles.container}>
      <h1>Unauthorized</h1>

      <h5>(please login to continue)</h5>
    </div>
  );
}

export default Unauthorized;
