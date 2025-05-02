import React, { useState } from 'react';
import styles from './WriteForm.module.css';

function WriteForm(props) {
  const { onSubmit, movieInfo, reviewInfo } = props;

  const [selectedRating, setSelectedRating] = useState(
    reviewInfo ? reviewInfo.rating_score.length : ''
  );
  const [hoverRating, setHoverRating] = useState('');
  const [oneLineReview, setOneLineReview] = useState(
    reviewInfo ? reviewInfo.board_one_line_review : ''
  );
  const [review, setReview] = useState(
    reviewInfo ? reviewInfo.board_content : ''
  );
  const movieTitle = movieInfo
    ? movieInfo.title
    : reviewInfo
    ? reviewInfo.Movie.movie_title
    : null;

  const handleMouseEnter = (rating) => setHoverRating(rating);
  const handleMouseLeave = () => setHoverRating(0);

  const onOneLineReview = (e) => {
    setOneLineReview(e.target.value);
  };
  const onReview = (e) => {
    setReview(e.target.value);
  };

  const submitWriteForm = (e) => {
    e.preventDefault();
    onSubmit({
      selectedRating,
      oneLineReview,
      review,
    });
  };

  const indexArray = [1, 2, 3, 4, 5];
  return (
    <div className={styles.writeForm_container}>
      <span className={styles.writeReview_movieTitle}>{movieTitle}</span>
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
            defaultValue={oneLineReview}
            onChange={onOneLineReview}
            className={styles.write_oneLineReview}
          />
        </div>
        <div className={styles.write_form_box}>
          <label htmlFor="review">후기</label>
          <textarea
            type="text"
            placeholder="후기를 작성해주세요."
            defaultValue={review}
            onChange={onReview}
            className={styles.write_review}
          />
        </div>
        <button type="submit" className={styles.write_submit_btn}>
          {movieInfo ? '후기 작성' : reviewInfo ? '수정하기' : null}
        </button>
      </form>
    </div>
  );
}

export default WriteForm;
