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

  useEffect(() => {
    const genreCount = {};

    //배열 순회하면서 장르의 출현 빈도 계산
    if (Array.isArray(movieGenre.genres)) {
      movieGenre.genres.forEach((genre) => {
        console.log(genre);
        if (genreCount[genre.name]) {
          genreCount[genre.name]++;
        } else {
          genreCount[genre.name] = 1;
        }
      });

      //결과를 빈도순으로 정렬
      const sortedGenres = Object.entries(genreCount).sort(
        (a, b) => b[1] - a[1]
      );

      //많이 등장한 두 개 장르 추출
      const topTwoGenres = sortedGenres.slice(0, 2).map((genre) => genre[0]);

      setMovieTaste(topTwoGenres);
    }
  }, [movieGenre]);

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
          {movieTaste.map((data) => {
            return <li>{data}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default MovieTaste;
