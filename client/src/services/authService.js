import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../store/authSlice';
import { useEffect } from 'react';
import logoutUser from '../services/logoutUtils';

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const useCheckAccessToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAccessToken = async (token) => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        console.log('AccessToken이 없습니다');
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:3003/auth/validate/accesstoken',
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response && response.status == 200) {
          console.log('AccessToken이 유효합니다.');
        }
      } catch (err) {
        if (err.response && err.response.status == 401) {
          console.log(
            'AccessToken이 유효하지 않습니다. RefreshToken을 검증합니다.'
          );
          try {
            const response2 = await axios.post(
              'http://localhost:3003/auth/validate/refreshtoken',
              {},
              {
                withCredentials: true,
              }
            );
            if (response2 && response2.status == 200) {
              console.log('RefreshToken이 유효하여 재발급을 진행합니다.');
              if (response2.headers['authorization']) {
                const accessToken = response2.headers['authorization'].replace(
                  'Bearer ',
                  ''
                );

                localStorage.setItem('accessToken', accessToken);
              }
              console.log('at 재발급을 진행했습니다.');
            }
          } catch (err) {
            if (err.response && err.response.status == 401) {
              console.log('RT가 유효하지 않습니다. 로그아웃을 진행합니다.');
              try {
                logoutUser();
                dispatch(logoutAsync());
              } catch (err) {
                console.log(err);
              }
            }
          }
        }
      }
    };
    //Token 검증 테스트를 위해 --초마다 동작하도록 함
    const intervalId = setInterval(checkAccessToken, 10 * 1000);

    return () => clearInterval(intervalId);
  }, []);
};

export default useCheckAccessToken;
