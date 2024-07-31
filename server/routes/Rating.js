const express = require('express');
const router = express.Router();
const { Rating } = require('../models/');

router.post('/writeRating', async (req, res) => {
  const { rating_score, board_no, movie_no, user_no } = req.body;
  try {
    const writeRatingResult = await Rating.create({
      rating_score: rating_score,
      board_no: board_no,
      movie_no: movie_no,
      user_no: user_no,
    });
    res.status(200).json({
      message: 'Rating created successfully',
      rating_no: writeRatingResult.rating_no,
    });
  } catch (err) {
    console.error('에러:', err);
  }
});

module.exports = router;
