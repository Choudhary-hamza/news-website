// app/not-found.js
import Link from "next/link";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.not_found_container}>
      <div className={styles.not_found_content}>
        <div className={styles.error_code}>404</div>
        <h1>Page Not Found</h1>
        <p>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.home_button}>
            Back to Home
          </Link>
          <button
            className={styles.help_button}
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
      <div className={styles.not_found_illustration}>
        <svg
          width="300"
          height="300"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M412.5 212.5C408.8 147.1 355.2 95 290 95C238.8 95 194.7 127.1 176.2 172.5C165.7 167.5 153.6 165 141 165C94.5 165 57.5 202 57.5 248.5C57.5 294.1 92.9 330.6 138 332.4V332.5H407.5V332.2C432.8 329.3 452.5 307.3 452.5 280C452.5 251.5 430.9 228.4 402.8 227.5C406.4 223 410.8 216.8 412.5 212.5Z"
            fill="#E6E6E6"
          />
          <path
            d="M192.7 290L218.2 230H243.2L217.7 290H192.7Z"
            fill="#333333"
          />
          <path d="M158 230H183V290H158V230Z" fill="#333333" />
          <path d="M183 250H213V270H183V250Z" fill="#333333" />
          <path d="M243 230H268V290H243V230Z" fill="#333333" />
          <path
            d="M283.7 290L309.2 230H334.2L308.7 290H283.7Z"
            fill="#333333"
          />
          <path d="M325 230V290H350V230H325Z" fill="#333333" />
          <circle cx="350" cy="240" r="10" fill="#333333" />
          <circle cx="148" cy="240" r="10" fill="#333333" />
        </svg>
      </div>
    </div>
  );
}
