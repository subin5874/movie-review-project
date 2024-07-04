import React from 'react';
import styles from './MovieSearch.module.css';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

function MovieSearch() {
  return (
    <div className={styles.main_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <SearchBar />
      </div>
    </div>
  );
}

export default MovieSearch;
