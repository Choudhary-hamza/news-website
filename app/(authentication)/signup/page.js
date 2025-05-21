"use client";
import Link from "next/link";
import styles from "./signup.module.css";
import { useState, useRef } from "react";
import checkValidation from "@/middleware/signup.middleware";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const [errors, setErrors] = useState([]);
  async function formSubmitHandler(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const role = roleRef.current.value;
    const data = { name, email, password };

    const res = await checkValidation(data);
    if (res) {
      setErrors(res.map((error) => error.msg));
    }
    if (!res) {
      const response = await fetch("/api/otp-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, role }),
      });
      if (response.ok) {
        router.push(`/otp?email=${encodeURIComponent(email)}`);
      } else {
        const data = await response.json();
        setErrors([data.message]);
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
          <h2 className={styles.heading}>Full name</h2>

          <input
            className={styles.inputField}
            required
            ref={nameRef}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
          />
          <h2 className={styles.heading}>Email</h2>
          <input
            className={styles.inputField}
            required
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            placeholder="abcd@gmail.com"
          />
          <h2 className={styles.heading}>Password</h2>
          <input
            className={styles.inputField}
            required
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />

          <select
            className={styles.selectField}
            required
            ref={roleRef}
            name="role"
            id="role"
          >
            <option value="reader">Reader</option>
            <option value="writer">Writer</option>
          </select>

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
        <p className={styles.textCenter}>
          Already have an account?{" "}
          <Link href="/login" className={styles.linkBlue}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
