import React, { useEffect, useState } from 'react';
import styles from './ReviewDetail.module.css';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatCreatedAt } from '../utils/formatCreatedAt';
import { formatRating } from '../utils/formatRating';
import { useNavigate } from 'react-router-dom';

function ReviewDetail() {
  const { boardNo } = useParams();
  console.log(boardNo);
  const [reviewDate, setReviewData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let results = [];
    axios
      .get('http://localhost:3003/board/reviewDetail/' + boardNo)
      .then((res) => {
        results = res.data.reviewDetail;
        console.log('result' + results);
        setReviewData(results);
        setReviewData((reviewDate) => {
          return {
            ...reviewDate,
            createdAt: formatCreatedAt(results.createdAt),
            rating_score: formatRating(results.Rating.rating_score),
          };
        });
        console.log(reviewDate);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onModifyBtn = () => {
    console.log('수정');
    navigate('/writeReview', { state: { boardNo: boardNo } });
  };
  const onDeleteBtn = () => {
    if (window.confirm('후기를 삭제하시겠습니까?') == true) {
      axios
        .post('http://localhost:3003/board/deleteBoard/' + boardNo)
        .then((res) => {
          console.log(res.data.message);
          navigate(-1);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return false;
    }
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <div className={styles.movie_title}>
          <span>{reviewDate.Movie?.movie_title || '영화 제목'}</span>
        </div>
        <div className={styles.movie_rating}>
          <span>{reviewDate.rating_score}</span>
        </div>
        <div className={styles.movie_one_line_review_box}>
          <label>한줄평</label>
          <span>{reviewDate.board_one_line_review}</span>
        </div>
        <div className={styles.movie_review}>
          <span>{reviewDate.board_content}</span>
        </div>
        <div className={styles.review_box_bottom}>
          <div className={styles.user_info_box}>
            <span>{reviewDate.User?.user_name || '작성자'}</span>
            <span>{reviewDate.createdAt}</span>
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
