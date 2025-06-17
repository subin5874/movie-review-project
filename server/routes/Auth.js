const express = require('express');
const router = express.Router();
const {
  verifyRefreshToken,
  verifyAccessToken,
  generateAccessToken,
} = require('../services/jwtService');

//accessToken 검증
router.post('/validate/accesstoken', (req, res) => {
  try {
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
      return res.status(401).json({ message: 'accessToken이 없습니다' });
    }

    const token = accessToken.split(' ')[1];
    const decoded = verifyAccessToken(token);
    return res.status(200).json({ message: 'accessToken이 유효합니다.' });
  } catch (err) {
    console.log(err);
    console.log(err.name);
    if (err.name === 'TokenExpiredError') {
      console.log('at가 만료되었습니다');
      return res.status(401).json({ message: 'accessToken이 만료되었습니다.' });
    }
  }
});

//refreshToken 검증
router.post('/validate/refreshtoken', (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token is missing' });
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res.status(401).json({ message: 'Token verification failed' });
    }

    //토큰이 유효할 때
    const user = {
      user_no: decoded.no,
      user_name: decoded.username,
    };
    const newAccessToken = generateAccessToken(user);
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Refresh Token expired' }); // 만료된 토큰
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid Refresh Token' }); // 잘못된 토큰
    } else {
      console.log('알 수 없는 오류');
    }
  }
});

module.exports = router;
