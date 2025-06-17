import React, { useEffect, useState } from 'react';
import styles from './UserMovieList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { formatPosterPath } from '../utils/formatPosterPath';
import { Link, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../api/movieDetails';
import axiosInstance from '../api/axiosInstance';
import logoutUser from '../services/authServices';
import { logoutAsync } from '../store/authSlice';

function UserMovieList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const user = useSelector((state) => state.auth.user);
  const [movieList, setMovieList] = useState([]);
  const [mList, setMList] = useState([]);

  //리뷰 리스트를 가져옴
  useEffect(() => {
    let results = [];
    const fetchUserReviews = async () => {
      try {
        const results1 = await axiosInstance.get(
          '/board/userReviewList/' + user.no,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        results = results1.data.userReviewResult;
        const movieNoList = results.map((data) => {
          return {
            board_no: data.board_no,
            movie_no: data.movie_no,
          };
        });
        setMList(movieNoList);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          try {
            logoutUser();
            dispatch(logoutAsync());
            navigate('/');
          } catch (err) {
            console.log(err);
          }
        }
        if (err.response && err.response.status === 500) {
          console.log(err);
        }
        console.log(err);
      }
    };
    fetchUserReviews();
  }, []);

  //가져온 리뷰리스트에서 포스터랑 영화 번호를 가져옴
  useEffect(() => {
    let UpdatemovieList = [];
    const fetchMovieInfo = async () => {
      try {
        for (const data of mList) {
          const results = await getMovieDetails(data.movie_no);
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
    fetchMovieInfo();
  }, [mList]);

  return (
    <div className={styles.userMovieList_container}>
      <span className={styles.movieList_title}>
        {movieList && movieList.length > 0
          ? '내가 작성한 영화 후기'
          : '아직 작성한 영화 후기가 없습니다'}
      </span>
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
