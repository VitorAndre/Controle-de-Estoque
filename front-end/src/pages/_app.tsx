import "../styles/global.scss";
import styles from "../styles/app.module.scss";
import { Navbar } from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.app}>
      <main>
        <div className={styles.corpo}>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  );
}

export default MyApp;
