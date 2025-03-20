import axios from 'axios';

const logoutUser = () => {
  axios
    .post(
      'http://localhost:3003/user/logout',
      {},
      {
        withCredentials: true,
      }
    )
    .then(() => {
      //dispatch(logoutAsync());
      localStorage.removeItem('accessToken');
    })
    .catch((err) => {
      console.log('로그아웃 실패');
      console.log(err);
    });
};

export default logoutUser;
