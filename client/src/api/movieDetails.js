import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

//MID 받아와서 넣어주기

export const getMovieDetails = async (movieNo) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieNo}?language=ko-KR`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: 'application/json',
        },
      }
    );
    console.log('response : ' + JSON.stringify(response.data));
    console.log(response.data.results);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
