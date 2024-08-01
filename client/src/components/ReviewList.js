import React, { useEffect, useState } from 'react';
import styles from './ReviewList.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatCreatedAt } from '../utils/formatCreatedAt';
import { formatRating } from '../utils/formatRating.js';

function ReviewList() {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    let results = [];
    axios
      .get('http://localhost:3003/board/reviewList')
      .then((res) => {
        results = res.data.reviewList;
        const updatedReviewList = results.map((results) => {
          return {
            ...results,
            createdAt: formatCreatedAt(results.createdAt),
            rating_score: formatRating(results.Rating.rating_score),
          };
        });
        setReviewList(updatedReviewList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.reviewList_container}>
      <span>영화 후기</span>
      <div className={styles.top_box}>
        <span>12개의 글</span>
        <Link to="/movieReview" className={styles.go_reviewList}>
          전체보기
        </Link>
      </div>
      <table>
        <thead className={styles.thead}>
          <tr>
            <th scope="col">영화 제목</th>
            <th scope="col">한줄평</th>
            <th scope="col">별점</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {reviewList &&
            reviewList.map((data, i) => {
              return (
                <tr key={i}>
                  <td className={styles.movie_title}>
                    <Link
                      to={`/movieDetail/${data.Movie.movie_no}`}
                      className={styles.go_movieDetail}
                    >
                      {data.Movie.movie_title}
                    </Link>
                  </td>
                  <td className={styles.movie_one_line_review}>
                    <Link
                      to={`/reviewDetail/${data.board_no}`}
                      className={styles.go_reviewDetail}
                    >
                      {data.board_one_line_review}
                    </Link>
                  </td>
                  <td className={styles.movie_rating}>
                    <div>
                      <span>{data.rating_score}</span>
                    </div>
                  </td>
                  <td className={styles.movie_userName}>
                    <div>
                      <span>{data.User.user_name}</span>
                    </div>
                  </td>
                  <td className={styles.movie_date}>
                    <div>
                      <span>{data.createdAt}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewList;
