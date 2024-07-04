import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ReviewList from '../components/ReviewList';
import MovieList from '../components/MovieList';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.main_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.header}>
        <div className={styles.header__img_container}>
          <img
            src="/assets/images/movie_poster.jpg"
            className={styles.main_img}
          />
        </div>
        <SearchBar />
      </div>
      <div className={styles.main_content}>
        <ReviewList />
        <MovieList />
      </div>
    </div>
  );
}

export default Home;
