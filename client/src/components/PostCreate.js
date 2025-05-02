import React from 'react';
import axios from 'axios';
import WriteForm from './WriteForm';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const PostCreate = () => {
  const localhost = useLocation();
  const navigate = useNavigate();

  const { movieInfo } = localhost.state;
  const movieNo = movieInfo.id;
  const user = useSelector((state) => state.auth.user);

  const submitWriteForm = async (formData) => {
    try {
      const movieResponse = await axios.post(
        'http://localhost:3003/movie/movieInfo',
        {
          movie_no: movieNo,
          movie_title: movieInfo.title,
        }
      );

      const reviewResponse = await axios.post(
        'http://localhost:3003/board/writeBoard',
        {
          board_one_line_review: formData.oneLineReview,
          board_content: formData.review,
          user_no: user.no,
          movie_no: movieNo,
        }
      );

      const ratingResponse = await axios.post(
        'http://localhost:3003/rating/writeRating',
        {
          rating_score: formData.selectedRating,
          board_no: reviewResponse.data.board_no,
          movie_no: movieNo,
          user_no: user.no,
        }
      );

      window.alert('후기를 성공적으로 작성하였습니다!');
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return <WriteForm onSubmit={submitWriteForm} movieInfo={movieInfo} />;
};

export default PostCreate;
