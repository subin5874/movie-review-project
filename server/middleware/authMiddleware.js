const { verifyAccessToken } = require('../services/jwtService');

function validateAccessToken(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  try {
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ message: '로그인이 만료되었습니다. 다시 로그인해주세요.' });
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: '토큰이 존재하지 않습니다.' });
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: '토큰이 유효하지 않습니다.' });
  }
}

module.exports = { validateAccessToken };
