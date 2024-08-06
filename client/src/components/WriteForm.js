import React, { useEffect, useState } from 'react';
import styles from './WriteForm.module.css';
import { getMovieDetails } from '../api/movieDetails';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function WriteForm(props) {
  const { movieNo, boardNo } = props;
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [movieInfo, setMovieInfo] = useState([]);
  const [selectedRating, setSelectedRating] = useState('');
  const [hoverRating, setHoverRating] = useState('');
  const [oneLineReview, setOneLineReview] = useState('');
  const [review, setReview] = useState('');
  const [reviewData, setReviewData] = useState('');

  const handleMouseEnter = (rating) => setHoverRating(rating);
  const handleMouseLeave = () => setHoverRating(0);

  useEffect(() => {
    if (movieNo && !boardNo) {
      console.log('게시글 새로 작성');
      const fetchMovies = async () => {
        try {
          const movieInforesults = await getMovieDetails(movieNo);
          setMovieInfo(movieInforesults);
        } catch (err) {
          console.error(err);
        }
      };
      fetchMovies();
      console.log(movieInfo);
    } else if (boardNo && !movieNo) {
      console.log('게시글 수정');
      const getReview = async () => {
        try {
          const reviewDatares = await axios.get(
            `http://localhost:3003/board/reviewDetail/${boardNo}`
          );
          const result = reviewDatares.data.reviewDetail;
          console.log(result);
          setReviewData(result);
          setSelectedRating(result.Rating.rating_score);
        } catch (err) {
          console.error(err);
        }
      };
      getReview();
      console.log(reviewData);
    }
  }, [movieNo, boardNo]);

  const onOneLineReview = (e) => {
    setOneLineReview(e.target.value);
  };
  const onReview = (e) => {
    setReview(e.target.value);
  };

  const onClickRating = (event) => {
    const value = event.target.value;
    setSelectedRating(value);
  };

  const submitWriteForm = (e) => {
    e.preventDefault();
    if (movieNo && !boardNo) {
      axios
        .post('http://localhost:3003/movie/movieInfo', {
          movie_no: movieNo,
          movie_title: movieInfo.title,
        })
        .then((res) => {
          console.log('movie result: ', res.data.message);
          axios
            .post('http://localhost:3003/board/writeBoard', {
              board_one_line_review: oneLineReview,
              board_content: review,
              user_no: user.no,
              movie_no: movieNo,
            })
            .then((res) => {
              console.log('board result: ' + res.data.message);
              axios
                .post('http://localhost:3003/rating/writeRating', {
                  rating_score: selectedRating,
                  board_no: res.data.board_no,
                  movie_no: movieNo,
                  user_no: user.no,
                })
                .then((res) => {
                  console.log('rating result: ', +res.data.message);
                  window.alert('후기를 성공적으로 작성하였습니다!');
                  navigate(-1);
                })
                .catch((err) => {
                  console.error('Error writing rating:', err);
                });
            })
            .catch((err) => {
              console.error('Error writing board:', err);
            });
        })
        .catch((err) => {
          console.error('Error checking movie:', err);
        });
    } else if (boardNo && !movieNo) {
      console.log('게시글 수정');
      axios
        .post('http://localhost:3003/board/modifyBoard/' + boardNo, {
          board_one_line_review: oneLineReview,
          board_content: review,
        })
        .then((res) => {
          console.log('board result: ' + res.data.message);
          axios
            .post('http://localhost:3003/rating/modifyRating/' + boardNo, {
              rating_score: selectedRating,
            })
            .then((res) => {
              console.log('rating result: ', +res.data.message);
              window.alert('후기를 성공적으로 수정하였습니다!');
              navigate(-1);
            })
            .catch((err) => {
              console.error('Error writing rating:', err);
            });
        })
        .catch((err) => {
          console.error('Error writing board:', err);
        });
    }
  };

  const indexArray = [1, 2, 3, 4, 5];
  return (
    <div className={styles.writeForm_container}>
      <span className={styles.writeReview_movieTitle}>
        {movieNo
          ? movieInfo.title
          : boardNo && reviewData
          ? reviewData.Movie.movie_title
          : null}
      </span>
      <form onSubmit={submitWriteForm} className={styles.write_form}>
        <div className={styles.write_form_box}>
          <label htmlFor="rating">별점</label>
          <div className={styles.write_rating_box}>
            {indexArray.map((data) => {
              return (
                <div className={styles.rating_radio_btn} key={data}>
                  <input
                    type="radio"
                    className={styles.rating_star}
                    value={data}
                    onChange={() => setSelectedRating(data)}
                    checked={selectedRating === data}
                  />
                  <label
                    htmlFor={data}
                    className={`${styles.star} ${
                      (
                        hoverRating
                          ? hoverRating >= data
                          : selectedRating >= data
                      )
                        ? styles.active
                        : styles.inactive
                    }`}
                    onClick={() => setSelectedRating(data)}
                    onMouseEnter={() => handleMouseEnter(data)}
                    onMouseLeave={handleMouseLeave}
                  >
                    ★
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.write_form_box}>
          <label htmlFor="oneLineReview">한줄평</label>
          <input
            type="text"
            placeholder="한줄평을 작성해주세요."
            defaultValue={boardNo ? reviewData.board_one_line_review : null}
            onChange={onOneLineReview}
            className={styles.write_oneLineReview}
          />
        </div>
        <div className={styles.write_form_box}>
          <label htmlFor="review">후기</label>
          <textarea
            type="text"
            placeholder="후기를 작성해주세요."
            defaultValue={boardNo ? reviewData.board_content : null}
            onChange={onReview}
            className={styles.write_review}
          />
        </div>
        <button type="submit" className={styles.write_submit_btn}>
          {movieNo ? '후기 작성' : boardNo ? '수정하기' : null}
        </button>
      </form>
    </div>
  );
}

export default WriteForm;
