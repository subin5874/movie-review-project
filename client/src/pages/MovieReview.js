import React from 'react';
import styles from './MovieReview.module.css';
import Navbar from '../components/Navbar';
import ReviewList from '../components/ReviewList';

function MovieReview() {
  return (
    <div className={styles.main_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <ReviewList />
      </div>
    </div>
  );
}

export default MovieReview;
