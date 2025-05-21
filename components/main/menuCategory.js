"use client";
import styles from "./menuList.module.css";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";
import { useState, useEffect, use } from "react";

export default function MenuCategory() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [isOpen]);
  return (
    <>
      {!isOpen ? (
        <div className={styles.icon1}>
          <i className="ri-menu-line" onClick={() => setIsOpen(true)}></i>
        </div>
      ) : (
        <ul className={styles.list} onClick={() => setIsOpen(false)}>
          <li>
            <Link href="/">All</Link>
          </li>
          <li>
            <Link href="/">Politics</Link>
          </li>
          <li>
            <Link href="/">Game</Link>
          </li>
          <li>
            <Link href="/">Technology</Link>
          </li>
          <li>
            <Link href="/signup">Sports</Link>
          </li>
          <li>
            <Link href="/">Health</Link>
          </li>
          <li>
            <Link href="/">Business</Link>
          </li>
          <li>
            <Link href="/">Entertaiment</Link>
          </li>
        </ul>
      )}
    </>
  );
}
