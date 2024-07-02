import React, { useState } from 'react';
import styles from './ReviewList.module.css';
import { Link } from 'react-router-dom';

function ReviewList() {
  const [reviewList, setReviewList] = useState([
    {
      title: '웡카',
      online_review: '정말 재밌어요',
      rating: '★★★★★',
      name: '수달',
      date: '2010-10-02',
    },
    {
      title: '인사이드 아웃2',
      online_review: '정말 감동의 물결 가득~',
      rating: '★★★★',
      name: '수달',
      date: '2010-10-02',
    },
    {
      title: '피라냐',
      online_review: '내용이 너무너무 구려요',
      rating: '★',
      name: '수달',
      date: '2010-10-02',
    },
  ]);
  return (
    <div className={styles.reviewList_container}>
      <span>영화 후기</span>
      <div className={styles.top_box}>
        <span>12개의 글</span>
        <Link to="/" className={styles.go_reviewList}>
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
                <tr>
                  <td className={styles.movie_title}>
                    <div>
                      <span>{data.title}</span>
                    </div>
                  </td>
                  <td className={styles.movie_one_line_review}>
                    <div>
                      <span>{data.online_review}</span>
                    </div>
                  </td>
                  <td className={styles.movie_rating}>
                    <div>
                      <span>{data.rating}</span>
                    </div>
                  </td>
                  <td className={styles.movie_userName}>
                    <div>
                      <span>{data.name}</span>
                    </div>
                  </td>
                  <td className={styles.movie_date}>
                    <div>
                      <span>{data.date}</span>
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
