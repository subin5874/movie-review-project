const express = require('express');
const router = express.Router();
const { Board, User, Movie, Rating } = require('../models/');

router.post('/writeBoard', async (req, res) => {
  const { board_one_line_review, board_content, user_no, movie_no } = req.body;
  try {
    const writeBoardResult = await Board.create({
      board_one_line_review: board_one_line_review,
      board_content: board_content,
      user_no: user_no,
      movie_no: movie_no,
    });
    res.status(201).json({
      message: 'Board created successfully',
      board_no: writeBoardResult.board_no,
    });
  } catch (err) {
    console.error('에러:', err);
  }
});

router.get('/reviewList', async (req, res) => {
  try {
    const reviewList = await Board.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
        {
          model: Movie,
          attributes: ['movie_title'],
        },
        {
          model: Rating,
          attributes: ['rating_score'],
        },
      ],
      order: [['board_no', 'desc']],
    });
    res.status(200).json({
      message: 'get boardList successfully',
      reviewList,
    });
  } catch (err) {
    console.error('에러:', err);
  }
});
module.exports = router;
