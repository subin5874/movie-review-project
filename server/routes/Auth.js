const express = require('express');
const router = express.Router();
const {
  verifyRefreshToken,
  verifyAccessToken,
  generateAccessToken,
} = require('../services/jwtService');

router.post('/validate/accesstoken', (req, res) => {
  try {
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
      return res.status(401).json({ message: 'accessToken이 없습니다' });
    }

    const token = accessToken.split(' ')[1];
    const decoded = verifyAccessToken(token);
  } catch (err) {
    console.log(err);
    console.log(err.name);
    if (err.name === 'TokenExpiredError') {
      console.log('at가 만료되었습니다');
      res.status(401).json({ message: 'accessToken이 만료되었습니다.' });
    }
  }
});

router.post('/validate/refreshtoken', (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token is missing' }); // 토큰이 없을 때
    }

    const decoded = verifyRefreshToken(refreshToken);
    console.log(decoded);

    if (!decoded) {
      return res.status(500).json({ message: 'Token verification failed' });
    }

    if (decoded === 'expired') {
      return res.status(401).json({ message: 'Refresh Token expired' }); // 만료된 토큰
    } else if (decoded === 'invalid') {
      return res.status(401).json({ message: 'Invalid Refresh Token' }); // 잘못된 토큰
    }

    //토큰이 유효할 때
    const user = {
      no: decoded.no,
      username: decoded.username,
    };
    const accessToken = generateAccessToken(user);
    return res
      .status(200)
      .header('Authorization', `Bearer ${accessToken}`)
      .json({ message: 'Refresh Token is valid' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
