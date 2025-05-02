import React from 'react';
import axios from 'axios';
import WriteForm from './WriteForm';
import { useLocation, useNavigate } from 'react-router-dom';

export const PostEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { reviewDate } = location.state;
  const boardNo = reviewDate.board_no;

  const submitWriteForm = async (formData) => {
    try {
      const reviewResponse = await axios.post(
        'http://localhost:3003/board/modifyBoard/' + boardNo,
        {
          board_one_line_review: formData.oneLineReview,
          board_content: formData.review,
        }
      );

      const ratingResponse = await axios.post(
        'http://localhost:3003/rating/modifyRating/' + boardNo,
        {
          rating_score: formData.selectedRating,
        }
      );

      window.alert('후기를 성공적으로 수정하였습니다!');
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return <WriteForm onSubmit={submitWriteForm} reviewInfo={reviewDate} />;
};

export default PostEdit;
