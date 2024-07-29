import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export const getReleaseDates = async (movieNo) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieNo}/release_dates`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: 'application/json',
        },
      }
    );
    const krReleaseDates = response.data.results.find(
      (result) => result.iso_3166_1 === 'KR'
    );
    console.log(krReleaseDates);
    return krReleaseDates;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
