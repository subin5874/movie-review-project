import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../store/authSlice';

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutAsync());
  };
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
        {isAuthenticated ? (
          <li>
            <Link to="/mypage" className={styles.nav_link}>
              마이페이지
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className={styles.nav_link}>
              로그인
            </Link>
          </li>
        )}
        {isAuthenticated ? (
          <li>
            <Link onClick={onLogout} className={styles.nav_link}>
              로그아웃
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/signup" className={styles.nav_link}>
              회원가입
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
