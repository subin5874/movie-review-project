const express = require('express');
const router = express.Router();
const { Rating } = require('../models/');
const validateToken = require('../middleware/authMiddleware');

router.post(
  '/writeRating',
  validateToken.validateAccessToken,
  async (req, res) => {
    const { rating_score, board_no, movie_no } = req.body;
    const userNo = req.user.no;
    try {
      const writeRatingResult = await Rating.create({
        rating_score: rating_score,
        board_no: board_no,
        movie_no: movie_no,
        user_no: userNo,
      });
      res.status(200).json({
        message: 'Rating created successfully',
        rating_no: writeRatingResult.rating_no,
      });
    } catch (err) {
      console.error('에러:', err);
    }
  }
);

router.post(
  '/modifyRating/:boardNo',
  validateToken.validateAccessToken,
  async (req, res) => {
    let boardNo = Number(req.params.boardNo);
    const { rating_score } = req.body;
    try {
      const writeRatingResult = await Rating.update(
        {
          rating_score: rating_score,
        },
        {
          where: {
            board_no: boardNo,
          },
        }
      );
      res.status(200).json({
        message: 'Rating modify successfully',
        rating_no: writeRatingResult.rating_no,
      });
    } catch (err) {
      console.error('에러:', err);
    }
  }
);

router.get('/getRatings/:userNo', async (req, res) => {
  let userNo = Number(req.params.userNo);
  try {
    const getUserRatings = await Rating.findAll({
      where: {
        user_no: userNo,
      },
    });
    res.status(200).json({
      message: 'get Rating successfully',
      ratings: getUserRatings,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
