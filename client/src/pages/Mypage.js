import React from 'react';
import styles from './Mypage.module.css';
import Navbar from '../components/Navbar';
import MovieTaste from '../components/MovieTaste';
import { useSelector } from 'react-redux';
import UserMovieList from '../components/UserMovieList';

function Mypage() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={styles.main_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <div className={styles.userInfo_box}>
          <span>{user.name} 님</span>
        </div>
        <div className={styles.content_flex}>
          <MovieTaste />
          <UserMovieList />
        </div>
      </div>
    </div>
  );
}

export default Mypage;
