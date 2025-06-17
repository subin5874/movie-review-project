import axiosInstance from './axiosInstance';

const isTokensValid = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('토큰이 없습니다.');
  }
  try {
    await axiosInstance.post(
      '/auth/validate/accesstoken',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return true;
  } catch (error) {
    throw new Error('토큰이 유효하지 않습니다.');
  }
};

export default isTokensValid;
