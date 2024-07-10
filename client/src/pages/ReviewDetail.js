import React, { useState } from 'react';
import styles from './ReviewDetail.module.css';
import Navbar from '../components/Navbar';

function ReviewDetail() {
  const [reviewDate, setReviewData] = useState({
    movie_title: '인사이드 아웃2',
    movie_rating: 5,
    movie_one_line_review: '정말로 즐거운 영화입니다. 만점!',
    movie_review:
      '인사이드 아웃1도 정말 재밌게 봤는데 2는 더 새로운 감정들이 나와서 재밌었어요. 불안이가 제일 공감되는 듯 해요. 아직도 제 안에는 불안이가 크게 자리를 잡고 있는 것 같거든요',
    user_name: '수달',
    review_date: '2024.06.21',
  });

  const onModifyBtn = () => {
    console.log('수정');
  };
  const onDeleteBtn = () => {
    console.log('삭제');
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <div className={styles.movie_title}>
          <span>{reviewDate.movie_title}</span>
        </div>
        <div className={styles.movie_rating}>
          <span>★★★★</span>
        </div>
        <div className={styles.movie_one_line_review_box}>
          <label>한줄평</label>
          <span>{reviewDate.movie_one_line_review}</span>
        </div>
        <div className={styles.movie_review}>
          <span>{reviewDate.movie_review}</span>
        </div>
        <div className={styles.review_box_bottom}>
          <div className={styles.user_info_box}>
            <span>{reviewDate.user_name}</span>
            <span>{reviewDate.review_date}</span>
          </div>
          <div className={styles.modify_btn_box}>
            <button onClick={onModifyBtn} className={styles.modify_btn}>
              수정
            </button>
            <button onClick={onDeleteBtn} className={styles.modify_btn}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;
