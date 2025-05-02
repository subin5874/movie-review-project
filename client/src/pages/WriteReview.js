import React from 'react';
import styles from './WriteReview.module.css';
import Navbar from '../components/Navbar';
import WriteForm from '../components/WriteForm';
import { useLocation } from 'react-router-dom';
import PostCreate from '../components/PostCreate';
import PostEdit from '../components/PostEdit';

function WriteReview() {
  const location = useLocation();
  let movieInfo = null;
  let reviewInfo = null;

  if (location.state.movieInfo) {
    movieInfo = location.state.movieInfo;
  } else if (location.state.reviewDate) {
    reviewInfo = location.state.reviewDate;
  }

  return (
    <div className={styles.writeReview_contaier}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        {movieInfo ? (
          <PostCreate movieInfo={movieInfo} />
        ) : (
          reviewInfo && <PostEdit reviewInfo={reviewInfo} />
        )}
      </div>
    </div>
  );
}

export default WriteReview;
