import styles from "./mainPage.module.css";
import MenuCategory from "@/components/main/menuCategory";
import HotHeadline from "@/components/main/hotHeadline";
export default function Home() {
  return (
    <>
      <div className={styles.menu}>
        <MenuCategory />
        <form
          className={`col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 ${styles.search}`}
          role="search"
        >
          <input
            type="search"
            className={`form-control ${styles.search}`}
            placeholder="Search..."
            aria-label="Search"
          ></input>
        </form>
      </div>
      <main className={styles.main}>
        <HotHeadline />
      </main>
    </>
  );
}
