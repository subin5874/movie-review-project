import WriteForm from './WriteForm';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export const PostCreate = () => {
  const localhost = useLocation();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const { movieInfo } = localhost.state;
  const movieNo = movieInfo.id;

  const submitWriteForm = async (formData) => {
    try {
      const movieResponse = await axiosInstance.post(
        '/movie/movieInfo',
        {
          movie_no: movieNo,
          movie_title: movieInfo.title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const reviewResponse = await axiosInstance.post(
        '/board/writeBoard',
        {
          board_one_line_review: formData.oneLineReview,
          board_content: formData.review,
          movie_no: movieNo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const ratingResponse = await axiosInstance.post(
        '/rating/writeRating',
        {
          rating_score: formData.selectedRating,
          board_no: reviewResponse.data.board_no,
          movie_no: movieNo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
