const express = require('express');
const router = express.Router();
const { Movie } = require('../models/');
const validateToken = require('../middleware/authMiddleware');
const { ConnectionAcquireTimeoutError } = require('sequelize');

router.post(
  '/movieInfo',
  validateToken.validateAccessToken,
  async (req, res) => {
    const { movie_no, movie_title } = req.body;
    try {
      const movie = await Movie.findOne({
        where: {
          movie_no: movie_no,
        },
      });
      if (movie) {
        res.status(200).json({ message: 'Movie already exists' });
      } else {
        try {
          const movieReault = await Movie.create({
            movie_no: movie_no,
            movie_title: movie_title,
          });
          res.status(201).json({
            message: 'Movie created successfully',
            movie_no: movieReault.movie_no,
          });
        } catch (err) {
          console.error('영화 추가 에러:', err);
        }
      }
    } catch (err) {
      console.error('영화 확인 에러:', err);
    }
  }
);

router.get('/movies/ids', async (req, res) => {
  const ids = await Movie.findAll({ attributes: ['movie_no'] });
  res.status(201).json(ids.map((movie) => movie.movie_no));
});

router.post('/genres', async (req, res) => {
  const movieData = req.body;
  let movie_no = movieData.movie_no;
  let movie_genre = movieData.movie_genre;
  if (movie_genre) {
    try {
      const result = await Movie.update(
        {
          movie_genre: JSON.stringify(movie_genre),
        },
        { where: { movie_no: movie_no } }
      );
      res.status(201).json({
        message: '장르 추가 성공',
      });
    } catch (err) {
      console.log('영화 장르 추가 에러:', err);
      res.status(500).json({ error: 'DB 업데이트 실패' });
    }
  } else {
    res.status(400).json({ error: 'movie_genre가 없음' });
  }
});

module.exports = router;
