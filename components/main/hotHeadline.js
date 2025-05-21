import styles from "./menuList.module.css";
export default function HotHeadline() {
  return (
    <>
      <h1 className={styles.hot}>Hot Topics</h1>
      <div className={styles.hotList}>
        <div className={styles.hotListImage}>
          <img
            src="https://cdn.britannica.com/66/162466-131-47ADB66F/Man-butterfly-stroke-pool.jpg"
            height="450px"
          ></img>
          <p className={styles.title}>
            {" "}
            this is the tital of the every news that willl be presented
          </p>
          <p className={styles.newsTime}>
            <span>2 hours ago</span>
            <span>Pakistan news</span>
          </p>
        </div>
        <div className={styles.description}>this will be the description</div>
      </div>
    </>
  );
}
