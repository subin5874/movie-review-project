import { useEffect, useState } from 'react';
import styles from './ReviewDetail.module.css';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { formatCreatedAt } from '../utils/formatCreatedAt';
import { formatRating } from '../utils/formatRating';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';

function ReviewDetail() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  const accessToken = localStorage.getItem('accessToken');

  const { boardNo } = useParams();
  const [reviewDate, setReviewData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let results = [];
    const fetchReview = async () => {
      try {
        const response = await axiosInstance.get(
          '/board/reviewDetail/' + boardNo
        );
        results = response.data.reviewDetail;
        setReviewData(results);
        setReviewData((reviewDate) => {
          return {
            ...reviewDate,
            createdAt: formatCreatedAt(results.createdAt),
            rating_score: formatRating(results.Rating.rating_score),
          };
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchReview();
  }, []);

  const onModifyBtn = () => {
    navigate('/writeReview', { state: { reviewDate: reviewDate } });
  };

  const onDeleteBtn = async () => {
    if (window.confirm('후기를 삭제하시겠습니까?') == true) {
      try {
        await axiosInstance.post(
          '/board/deleteBoard/' + boardNo,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
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
          {isAuthenticated ? (
            userData.user.no == reviewDate.User?.user_no ? (
              <div className={styles.modify_btn_box}>
                <button onClick={onModifyBtn} className={styles.modify_btn}>
                  수정
                </button>
                <button onClick={onDeleteBtn} className={styles.modify_btn}>
                  삭제
                </button>
              </div>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;
