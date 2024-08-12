import React, { useEffect, useState } from 'react';
import styles from './MovieTaste.module.css';
import { useSelector } from 'react-redux';
import { getMovieDetails } from '../api/movieDetails';
import axios from 'axios';
import MovieRatingChart from './MovieRatingChart';

function MovieTaste() {
  const user = useSelector((state) => state.auth.user);
  const [movieData, setMovieData] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieTaste, setMovieTaste] = useState([]);

  useEffect(() => {
    let result = '';
    const userReviewMovie = async () => {
      await axios
        .get('http://localhost:3003/board/userReviewList/' + user.no)
        .then((res) => {
          result = res.data.userReviewResult;
          console.log(result);
          setMovieData(result);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    userReviewMovie();
  }, []);

  useEffect(() => {
    let result = '';
    let userMovieData = [];
    const userMovieGenre = async () => {
      try {
        movieData.map(async (data, index) => {
          console.log('장르 가져오기: ' + data.movie_no);
          result = await getMovieDetails(data.movie_no);
          console.log(result);
          if (result.genres) {
            result.genres.forEach((genreData) => {
              setMovieGenre((movieGenre) => ({
                ...movieGenre,
                genres: [...(movieGenre.genres || []), genreData],
              }));
            });
          } else {
            setMovieGenre('');
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    userMovieGenre();
    setMovieGenre(userMovieData);
  }, [movieData]);

  // useEffect(() => {
  //genre 갯수 비교
  //같으면 상위에서 가져오기
  //   console.log(movieGenre);
  //   const userMovieTaste = async () => {
  //     try {
  //       movieGenre.genres.map((data, index) => {
  //         console.log(data);
  //       });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   userMovieTaste();
  // }, [movieGenre]);

  useEffect(() => {
    console.log(movieGenre);
  }, [movieGenre]);

  return (
    <div className={styles.movieTaste_container}>
      <div className={styles.ratingDoughnutChart_box}>
        <span>최다 별점</span>
        <MovieRatingChart />
      </div>
      <div className={styles.movieGenre_box}>
        <span>선호하는 영화 장르</span>
        <ul className={styles.movieGenre_list}>
          <li>애니메이션</li>
          <li>SF</li>
        </ul>
      </div>
    </div>
  );
}

export default MovieTaste;
