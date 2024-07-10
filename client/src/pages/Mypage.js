import React from 'react';
import styles from './Mypage.module.css';
import Navbar from '../components/Navbar';
import MovieTaste from '../components/MovieTaste';
import MovieList from '../components/MovieList';

function Mypage() {
  return (
    <div className={styles.main_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <div className={styles.userInfo_box}>
          <span>닉네임</span>
        </div>
        <div className={styles.content_flex}>
          <MovieTaste />
          <MovieList />
        </div>
      </div>
    </div>
  );
}

export default Mypage;
