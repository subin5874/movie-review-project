const { verifyRefreshToken } = require('../services/jwtService');

//로그아웃 시 JWT
const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      console.log('Decoded Payload:', decoded);

      // HttpOnly 쿠키 삭제
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
      });
    }

    return res.status(200).json({ message: '로그아웃 성공' });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Invalid Refresh Token' });
  }
};

module.exports = { logout };
