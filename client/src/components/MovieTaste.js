import React from 'react';
import styles from './MovieTaste.module.css';

function MovieTaste() {
  return (
    <div className={styles.movieTaste_container}>
      <div className={styles.movieGenre_box}>
        <span>좋아하는 영화 장르</span>
        <ul className={styles.movieGenre_list}>
          <li>애니메이션</li>
          <li>SF</li>
        </ul>
      </div>
    </div>
  );
}

export default MovieTaste;
