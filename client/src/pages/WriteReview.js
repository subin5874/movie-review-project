import React from 'react';
import styles from './WriteReview.module.css';
import Navbar from '../components/Navbar';
import WriteForm from '../components/WriteForm';

function WriteReview() {
  return (
    <div className={styles.writeReview_contaier}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <WriteForm />
      </div>
    </div>
  );
}

export default WriteReview;
