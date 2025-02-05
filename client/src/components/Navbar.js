import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    axios
      .post(
        'http://localhost:3003/user/logout',
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(logoutAsync());

        localStorage.removeItem('accessToken');

        //navigate('/');
        setTimeout(() => {
          navigate('/');
        }, 100);
      })
      .catch((err) => {
        console.log('로그아웃 실패');
        console.log(err);
      });
  };

  // const onLogout = () => {
  //   dispatch(logoutAsync());

  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');

  //   navigate('/');
  // };

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
