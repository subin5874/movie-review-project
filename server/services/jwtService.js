//JWT 생성 및 검증
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Access Token 생성
const generateAccessToken = (user) => {
  return jwt.sign(
    { no: user.user_no, username: user.user_name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

//Refresh Token 생성
const generateRefreshToken = (user) => {
  return jwt.sign(
    { no: user.user_no, username: user.user_name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

//AccessToken 검증
const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

//Refresh Token 검증
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
