import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export const searchMovies = async (searchKeyword) => {
  const Keyword = searchKeyword;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=1`,
      {
        params: {
          query: Keyword,
        },
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
