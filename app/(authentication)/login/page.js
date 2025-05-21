"use client";
import Link from "next/link";
import styles from "./login.module.css";
import checkValidation from "@/middleware/login.middleware";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState([]);
  async function formSubmitHandler(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const data = { email, password };

    const res = await checkValidation(data);
    if (res) {
      setErrors(res.map((error) => error.msg));
    }
    if (!res) {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        router.back();
      } else if (response.status === 401 || response.status === 400) {
        setErrors([responseData.message]);
      } else {
        setErrors([responseData.message]);
      }
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <img
          className={styles.logo}
          src="/images/news-site.jpg"
          alt="news-site image"
          loading="lazy"
        />
        <form className={styles.form} onSubmit={formSubmitHandler}>
          {errors.length > 0 && (
            <div className={styles.errorContainer}>
              <ul className={styles.errorList}>
                {errors.map((error, index) => (
                  <li key={index} className={styles.errorItem}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h2 className={styles.heading}>What's your email</h2>
          <input
            className={styles.inputField}
            required
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            placeholder="abcd@gmail.com"
          />
          <h2 className={styles.heading}>Enter password</h2>
          <input
            className={styles.inputField}
            required
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            placeholder="*******"
          />
          <button type="submit" className={styles.button}>
            login
          </button>
        </form>
        <p className={styles.textCenter}>
          new here?{" "}
          <Link href="/signup" className={styles.linkBlue}>
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
}
