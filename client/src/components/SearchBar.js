import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
  const searchSubmit = () => {
    console.log('submit');
  };

  const onSearch = () => {
    console.log('search');
  };

  return (
    <div className={styles.search_container}>
      <span>Search Movie Title</span>
      <form onSubmit={searchSubmit} className={styles.search_form}>
        <input type="text" className={styles.search_box} onChange={onSearch} />
        <button type="submit" className={styles.search_btn}>
          <img
            src="/assets/images/search-icon.png"
            alt="search-icon"
            className={styles.search_icon}
          />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
