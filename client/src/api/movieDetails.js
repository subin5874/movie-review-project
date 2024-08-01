import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

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

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
