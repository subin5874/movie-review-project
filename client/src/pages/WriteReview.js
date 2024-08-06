import React from 'react';
import styles from './WriteReview.module.css';
import Navbar from '../components/Navbar';
import WriteForm from '../components/WriteForm';
import { useLocation } from 'react-router-dom';

function WriteReview() {
  const location = useLocation();
  let movieNo = null;
  let boardNo = null;

  console.log('location: ' + JSON.stringify(location.state));
  if (location.state.movieNo) {
    movieNo = location.state.movieNo;
  } else if (location.state.boardNo) {
    boardNo = location.state.boardNo;
  }

  return (
    <div className={styles.writeReview_contaier}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        {movieNo ? (
          <WriteForm movieNo={movieNo} />
        ) : (
          boardNo && <WriteForm boardNo={boardNo} />
        )}
      </div>
    </div>
  );
}

export default WriteReview;
