import axiosInstance from './axiosInstance';
import { getMovieDetails } from './movieDetails';

export const addGenres = async () => {
  const res = await axiosInstance.get('/movie/movies/ids');
  const resData = res.data;

  let genreList = [];
  const getGenres = (list) => {
    genreList = list.map((data) => {
      return data.name;
    });
    return genreList;
  };

  const movieData = await Promise.all(
    resData.map(async (movie_no) => {
      const res = await getMovieDetails(movie_no);
      let movie_genres = getGenres(res.genres);
      return { movie_no, movie_genres };
    })
  );

  const postMovieGenres = async (data) => {
    console.log(data);
    const res = await axiosInstance.post('/movie/genres', {
      movie_no: data.movie_no,
      movie_genre: data.movie_genres,
    });
    return res.data;
  };

  const promises = movieData.map((data) => {
    return postMovieGenres(data);
  });

  try {
    await Promise.all(promises);
    console.log('모든 장르 추가 완료');
  } catch (err) {
    console.error(err);
  }
};
