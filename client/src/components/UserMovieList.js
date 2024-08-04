import React, { useEffect, useState } from 'react';
import styles from './UserMovieList.module.css';
import { useSelector } from 'react-redux';
import { formatPosterPath } from '../utils/formatPosterPath';
import { Link } from 'react-router-dom';
import { getMovieDetails } from '../api/movieDetails';
import axios from 'axios';

function UserMovieList() {
  const user = useSelector((state) => state.auth.user);
  const [movieList, setMovieList] = useState([]);
  const [mList, setMList] = useState([]);

  useEffect(() => {
    let results = [];
    const fetchMovies = async () => {
      axios
        .get('http://localhost:3003/board/userReviewList/' + user.no)
        .then((res) => {
          results = res.data.userReviewResult;
          const movieNoList = results.map((data) => {
            return {
              board_no: data.board_no,
              movie_no: data.movie_no,
            };
          });
          setMList(movieNoList);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    console.log(mList);
    let UpdatemovieList = [];
    const fetchMovies = async () => {
      try {
        for (const data of mList) {
          console.log('MNO: ' + data.movie_no);
          const results = await getMovieDetails(data.movie_no);
          console.log(results);
          UpdatemovieList.push({
            ...results,
            poster_path: formatPosterPath(results.poster_path),
            board_no: data.board_no,
          });
        }
        setMovieList(UpdatemovieList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [mList]);

  useEffect(() => {
    console.log(movieList);
  }, [movieList]);

  return (
    <div className={styles.userMovieList_container}>
      <span className={styles.movieList_title}>내가 작성한 영화 후기</span>
      <div className={styles.movieList_box}>
        {movieList &&
          movieList.map((data, i) => {
            return (
              <Link
                to={`/reviewDetail/${data.board_no}`}
                className={styles.go_movieDetail}
                key={i}
              >
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
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default UserMovieList;
