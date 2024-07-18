import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: 'application/json',
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
