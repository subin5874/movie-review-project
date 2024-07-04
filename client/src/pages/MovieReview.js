import React from 'react';
import styles from './MovieReview.module.css';
import Navbar from '../components/Navbar';
import ReviewList from '../components/ReviewList';
import { useNavigate } from 'react-router-dom';

function MovieReview() {
  const navigate = useNavigate();

  const writeBtn = () => {
    navigate('/writeMovieReview');
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <button
          type="button"
          onClick={writeBtn}
          className={styles.MovieReview_write_btn}
        >
          후기 작성하기
        </button>
        <ReviewList />
      </div>
    </div>
  );
}

export default MovieReview;
