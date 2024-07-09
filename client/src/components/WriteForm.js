import React, { useState } from 'react';
import styles from './WriteForm.module.css';

function WriteForm() {
  const [oneLineReview, setOneLineReview] = useState('');
  const [Review, setReview] = useState('');

  const onOneLineReview = (e) => {
    setOneLineReview(e);
  };
  const onReview = (e) => {
    setReview(e);
  };

  const submitWriteForm = () => {
    console.log('작성');
  };
  return (
    <div className={styles.writeForm_container}>
      <span className={styles.writeReview_movieTitle}>영화 제목</span>
      <form onSubmit={submitWriteForm} className={styles.write_form}>
        <div className={styles.write_form_box}>
          <label htmlFor="rating">별점</label>
          <div className={styles.write_rating_box}>
            <input type="radio" class={styles.rating_star} value="1" />
            <input type="radio" class={styles.rating_star} value="2" />
            <input type="radio" class={styles.rating_star} value="3" />
            <input type="radio" class={styles.rating_star} value="4" />
            <input type="radio" class={styles.rating_star} value="5" />
          </div>
        </div>
        <div className={styles.write_form_box}>
          <label htmlFor="oneLineReview">한줄평</label>
          <input
            type="text"
            placeholder="한줄평을 작성해주세요."
            onChange={onOneLineReview}
            className={styles.write_oneLineReview}
          />
        </div>
        <div className={styles.write_form_box}>
          <label htmlFor="review">후기</label>
          <textarea
            type="text"
            placeholder="후기를 작성해주세요."
            onChange={onReview}
            className={styles.write_review}
          />
        </div>
        <button type="submit" className={styles.write_submit_btn}>
          후기 작성
        </button>
      </form>
    </div>
  );
}

export default WriteForm;
