import React, { useEffect, useState } from 'react';
import styles from './MovieSearch.module.css';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { useLocation } from 'react-router-dom';

function MovieSearch() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [initialSearchKeyword, setInitialSearchKeyword] = useState('');

  const location = useLocation();
  useEffect(() => {
    setSearchKeyword(location.state);
    setInitialSearchKeyword(location.state);
  }, [location]);

  const searchSubmit = (keyword) => {
    if (keyword !== initialSearchKeyword) {
      setSearchKeyword(keyword);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <SearchBar onSearch={searchSubmit} />
        <div className={styles.movieList_container}>
          {!searchKeyword && <MovieList />}
          {searchKeyword && <MovieList searchKeyword={searchKeyword} />}
        </div>
      </div>
    </div>
  );
}

export default MovieSearch;
