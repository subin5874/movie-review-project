import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import logoutUser from '../services/authServices';
import { logoutAsync } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import isTokensValid from '../api/authChecker';

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMypage = async () => {
    try {
      await isTokensValid();
      navigate('/mypage');
    } catch (err) {
      window.alert('로그인이 만료되었습니다.');
      logoutUser();
      dispatch(logoutAsync());
      window.location.reload();
    }
  };

  const onLogout = () => {
    try {
      logoutUser();
      dispatch(logoutAsync());
      navigate('/');
    } catch (err) {
      console.log('로그아웃 실패');
    }
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
            <button onClick={onMypage} className={styles.nav_btn}>
              마이페이지
            </button>
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
            <button onClick={onLogout} className={styles.nav_btn}>
              로그아웃
            </button>
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
