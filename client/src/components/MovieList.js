import React, { useEffect, useState } from 'react';
import styles from './MovieList.module.css';
import { useLocation } from 'react-router-dom';
import { getNowPlayingMovies } from '../api/nowPlayingMovies';
import { getPopularMovies } from '../api/PopularMovies';
import { searchMovies } from '../api/SearchMovies';
import { formatPosterPath } from '../utils/formatPosterPath';

function MovieList({ searchKeyword }) {
  const [movieList, setMovieList] = useState([]);

  const pathName = useLocation().pathname;

  useEffect(() => {
    const fetchMovies = async () => {
      let results = [];
      let slicedResults = [];
      if (pathName === '/') {
        results = await getNowPlayingMovies();
        slicedResults = results.slice(0, 4);
      } else if (pathName === '/movieSearch' && !searchKeyword) {
        results = await getPopularMovies();
        slicedResults = results.slice(0, 4);
      }
      const updatedMovieList = slicedResults.map((slicedResults) => {
        return {
          ...slicedResults,
          poster_path: formatPosterPath(slicedResults.poster_path),
        };
      });
      setMovieList(updatedMovieList);
    };
    fetchMovies();
  }, [pathName, searchKeyword]);

  useEffect(() => {
    const fetchsearchMovies = async () => {
      let results = [];
      if (searchKeyword) {
        results = await searchMovies(searchKeyword);
      }
      const updatedMovieList = results.map((results) => {
        return {
          ...results,
          poster_path: formatPosterPath(results.poster_path),
        };
      });
      setMovieList(updatedMovieList);
    };
    fetchsearchMovies();
  }, [searchKeyword]);

  const [movieListTitle, setMovieListTitle] = useState('');
  const [movieListClassName, setMovieListClassName] = useState(
    styles.movieList_container
  );

  //페이지에 따른 리스트 타이틀 변경
  useEffect(() => {
    if (pathName === '/mypage') {
      setMovieListClassName(styles.movieList_container_mypage);
      setMovieListTitle('내가 작성한 영화 후기');
    } else if (searchKeyword) {
      setMovieListTitle('');
    } else if (pathName === '/movieSearch') {
      setMovieListTitle('인기있는 영화');
    } else if (pathName === '/') {
      setMovieListTitle('최근 개봉 영화');
    }
  }, [pathName, searchKeyword]);

  return (
    <div className={movieListClassName}>
      <span className={styles.movieList_title}>{movieListTitle}</span>
      <div className={styles.movieList_box}>
        {movieList &&
          movieList.map((data, i) => {
            return (
              <div className={styles.movie_box}>
                <div className={styles.moviePoster_box}>
                  <img
                    src={data.poster_path}
                    className={styles.movie_poster}
                    alt="poster"
                  />
                </div>
                <span>{data.title}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MovieList;
