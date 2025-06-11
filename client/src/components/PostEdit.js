import WriteForm from './WriteForm';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export const PostEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const { reviewDate } = location.state;
  const boardNo = reviewDate.board_no;

  const submitWriteForm = async (formData) => {
    try {
      const reviewResponse = await axiosInstance.post(
        '/board/modifyBoard/' + boardNo,
        {
          board_one_line_review: formData.oneLineReview,
          board_content: formData.review,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const ratingResponse = await axiosInstance.post(
        '/rating/modifyRating/' + boardNo,
        {
          rating_score: formData.selectedRating,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
