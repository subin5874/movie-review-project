import React, { useState } from 'react';
import styles from './MovieInfo.module.css';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/movieDetails';
import { getReleaseDates } from '../api/movieReleaseDates.js';
import { formatPosterPath } from '../utils/formatPosterPath';
import { useSelector } from 'react-redux';

function MovieInfo() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { movieNo } = useParams();
  const [movieInfo, setMovieInfo] = useState([]);

  const [firstGenre, setFirstGenre] = useState('');
  const [certification, setCertification] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieInforesults = await getMovieDetails(movieNo);
        const movieReleaseDates = await getReleaseDates(movieNo);
        setMovieInfo({
          ...movieInforesults,
          poster_path: formatPosterPath(movieInforesults.poster_path),
          vote_average: movieInforesults.vote_average.toFixed(1),
          releaseDates: movieReleaseDates,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [movieNo]);

  useEffect(() => {
    if (movieInfo.genres) {
      setFirstGenre(movieInfo.genres[0]?.name);
    } else {
      setFirstGenre('Unknown Genre');
    }

    if (movieInfo.releaseDates) {
      let cert = movieInfo.releaseDates.release_dates[0].certification;
      const match = cert.match(/(\d+)/);
      if (match) {
        setCertification(match[0] + '세 이상 관람가');
      } else if (cert === 'ALL' || cert === 'All') {
        setCertification('ALL');
      } else if (cert === '') {
        setCertification('');
      }
    } else {
      setCertification('');
    }
  }, [movieInfo]);
  const navigate = useNavigate();

  const onWriteReviewBtn = () => {
    if (!isAuthenticated) {
      window.alert('로그인 후 작성할 수 있습니다.');
    } else {
      navigate('/writeReview', { state: { movieInfo: movieInfo } });
    }
  };

  return (
    <div className={styles.movieInfo_container}>
      <div className={styles.movieInfo_box}>
        <div className={styles.movieInfo_poster}>
          <img
            src={movieInfo.poster_path}
            className={styles.movie_poster}
            alt="poster"
          />
          <button
            type="button"
            onClick={onWriteReviewBtn}
            className={styles.go_writeReview_btn}
          >
            후기 작성하기
          </button>
        </div>
      </div>
      <div className={styles.movieInfo_box}>
        <span className={styles.movieInfo_title}>{movieInfo.title}</span>
        <div className={styles.movieInfo_spec}>
          <span>{certification}</span>
          <span>{firstGenre}</span>
          <span>{movieInfo.runtime}분</span>
          <span>{movieInfo.release_date}</span>
        </div>
        <div className={styles.movieInfo_rating}>
          <span>★ {movieInfo.vote_average}</span>
        </div>
        <div className={styles.movieInfo_summary}>
          <label>줄거리</label>
          <span>{movieInfo.overview}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
