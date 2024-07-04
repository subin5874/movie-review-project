import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/assets/images/main-logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className={styles.nav_menu}>
        <li>
          <Link to="/movieSearch" className={styles.nav_link}>
            영화 검색
          </Link>
        </li>
        <li>
          <Link to="/movieReview" className={styles.nav_link}>
            영화 후기
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.nav_link}>
            로그인
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.nav_link}>
            회원가입
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
