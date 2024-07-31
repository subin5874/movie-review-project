const express = require('express');
const router = express.Router();
const { Movie } = require('../models/');

router.post('/movieInfo', async (req, res) => {
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
});

module.exports = router;
