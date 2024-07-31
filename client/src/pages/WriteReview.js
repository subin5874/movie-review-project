import React from 'react';
import styles from './WriteReview.module.css';
import Navbar from '../components/Navbar';
import WriteForm from '../components/WriteForm';
import { useLocation } from 'react-router-dom';

function WriteReview() {
  const location = useLocation();
  const movieNo = location.state;

  return (
    <div className={styles.writeReview_contaier}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <WriteForm movieNo={movieNo} />
      </div>
    </div>
  );
}

export default WriteReview;
