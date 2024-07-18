import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { useLocation } from 'react-router-dom';

function SearchBar({ onSearch }) {
  const [searchKeyword, setSearchKeyword] = useState('');

  const InputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    console.log('검색어:', searchKeyword);
    onSearch(searchKeyword);
  };

  const pathName = useLocation().pathname;

  let divClassName;
  if (pathName === '/') {
    divClassName = styles.search_container__Home;
  } else if (pathName === '/movieSearch') {
    divClassName = styles.search_container__MovieSearch;
  }
  //이전 url을 가져와서 Home/MovieSearch에 따라서 className을 다르게 바꾸기
  //안됨.

  return (
    <div className={divClassName}>
      <span>Search Movie Title</span>
      <form onSubmit={searchSubmit} className={styles.search_form}>
        <input
          type="text"
          className={styles.search_box}
          value={searchKeyword}
          onChange={InputChange}
        />
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
