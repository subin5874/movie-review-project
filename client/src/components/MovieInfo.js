import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function MovieInfo() {
  const MID = 150540;

  const [MInfo, setMInfo] = useState();
  //타입 알맞게 지정해서 response 들어가도록 하기.

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  const MovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${MID}?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: 'application/json',
          },
        }
      );
      console.log('response : ' + JSON.stringify(response.data));
      setMInfo(JSON.stringify(response.data));
      console.log(MInfo);
      return null;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  useEffect(() => {
    MovieDetails();
  }, []);

  return (
    <div className="movieInfo_container">
      <div>
        <div>
          <img src="posterpath" alt="poster" />
        </div>
        <div>
          <span>제목</span>
        </div>
        <div>
          <span>연령</span>
          <span>장르</span>
          <span>상영시간</span>
          <span>개봉일</span>
        </div>
        <div>
          <span>★ 별점</span>
        </div>

        <div>
          <span>줄거리</span>
          <span>줄거리 내용</span>
        </div>

        <div>
          <span>감독</span>
          <span>감독</span>
        </div>

        <div>
          <span>배우</span>
          <span>배우</span>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
