import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBar({ onSearch }) {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState('');

  const InputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    if (pathName === '/') navigate('/movieSearch');

    console.log('검색어:', searchKeyword);
    onSearch(searchKeyword);
  };

  let divClassName;
  if (pathName === '/') {
    divClassName = styles.search_container__Home;
  } else if (pathName === '/movieSearch') {
    divClassName = styles.search_container__MovieSearch;
  }

  return (
    <div className={divClassName}>
      {searchKeyword ? (
        <span> "{searchKeyword}"의 검색결과입니다 </span>
      ) : (
        <span>Search Movie Title</span>
      )}
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
