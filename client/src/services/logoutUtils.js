import axios from 'axios';

const logoutUser = async () => {
  try {
    axios.post('http://localhost:3003/user/logout');
    localStorage.removeItem('accessToken');
  } catch (err) {
    console.log('로그아웃 실패');
    throw new Error('로그아웃 실패');
  }
};

export default logoutUser;
