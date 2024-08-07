const express = require('express');
const router = express.Router();
const { Board, User, Movie, Rating } = require('../models/');
const { where } = require('sequelize');

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

router.post('/modifyBoard/:boardNo', async (req, res) => {
  const { board_one_line_review, board_content } = req.body;
  let boardNo = Number(req.params.boardNo);
  try {
    const modifyReviewResult = await Board.update(
      {
        board_one_line_review: board_one_line_review,
        board_content: board_content,
      },
      {
        where: {
          board_no: boardNo,
        },
      }
    );
    res.status(201).json({
      message: 'Board modify successfully',
      board_no: modifyReviewResult.board_no,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post('/deleteBoard/:boardNo', async (req, res) => {
  let boardNo = Number(req.params.boardNo);
  try {
    const deleteReviewResult = await Board.destroy({
      where: {
        board_no: boardNo,
      },
    });
    res.status(201).json({
      message: 'Board Delete successfully',
    });
  } catch (err) {
    console.error(err);
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
          model: Movie,
          attributes: ['movie_no'],
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

router.get('/reviewDetail/:boardNo', async (req, res) => {
  let boardNo = Number(req.params.boardNo);
  try {
    const reviewDetailResult = await Board.findOne({
      where: {
        board_no: boardNo,
      },
      include: [
        {
          model: Movie,
          attributes: ['movie_title'],
        },
        {
          model: User,
          attributes: ['user_no'],
        },
        {
          model: User,
          attributes: ['user_name'],
        },
        {
          model: Rating,
          attributes: ['rating_score'],
        },
      ],
    });
    res.status(200).json({
      message: 'get reviewDetail successfully',
      reviewDetail: reviewDetailResult,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/userReviewList/:userNo', async (req, res) => {
  let userNo = Number(req.params.userNo);
  try {
    const userReviewResult = await Board.findAll({
      where: {
        user_no: userNo,
      },
    });
    res.status(200).json({
      message: 'get userReviewList successfully',
      userReviewResult,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
