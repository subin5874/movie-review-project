import React, { useEffect, useState } from 'react';
import styles from './MovieList.module.css';
import axios from 'axios';

function MovieList() {
  const [movieList, setMovieList] = useState([
    {
      title: '영화 제목1',
      poster_url:
        'https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240613_225%2F1718269309742nRyRU_JPEG%2Fmovie_image.jpg',
    },
    {
      title: '영화 제목2',
      poster_url:
        'https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240613_225%2F1718269309742nRyRU_JPEG%2Fmovie_image.jpg',
    },
    {
      title: '영화 제목3',
      poster_url:
        'https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240613_225%2F1718269309742nRyRU_JPEG%2Fmovie_image.jpg',
    },
    {
      title: '영화 제목4',
      poster_url:
        'https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240613_225%2F1718269309742nRyRU_JPEG%2Fmovie_image.jpg',
    },
  ]);

  const categories = [
    { name: '영화 후기', value: 'movieReview' },
    { name: '최근 개봉 영화', value: 'NowPlayingMoview' },
    { name: '평점 높은 영화', value: 'topRatedMovie' },
    { name: '요즘 인기 있는 영화', value: 'popularMovie' },
  ];

  const searchKeyword = '아';

  const [MList, setMList] = useState([]);

  /*

  const BASE_URL = 'https://api.themoviedb.org/3/movie';
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=1`,
        {
          params: {
            query: searchKeyword,
          },
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: 'application/json',
          },
        }
      );
      setMList(response.data.results);
      console.log(MList);
      return null;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  */

  return (
    <div className={styles.movieList_container}>
      <span>최근 영화</span>
      <div className={styles.movieList_box}>
        {movieList.map((data, i) => {
          return (
            <div className={styles.movie_box}>
              <div className={styles.moviePoster_box}>
                <img
                  src={data.poster_url}
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
