import React from 'react';
import styles from './MovieDetail.module.css';
import Navbar from '../components/Navbar';
import MovieInfo from '../components/MovieInfo';
import ReviewList from '../components/ReviewList';

function MovieDetail() {
  return (
    <div className="main_container">
      <div className="top_bar">
        <Navbar />
      </div>
      <div className="main_content">
        <MovieInfo />
      </div>
      <div>
        <ReviewList />
      </div>
    </div>
  );
}

export default MovieDetail;
