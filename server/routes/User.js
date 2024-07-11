const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/');
const { where } = require('sequelize');

router.post('/signup', async (req, res) => {
  const { userName, id, password } = req.body;
  try {
    //비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    const signupReault = await User.create({
      user_name: userName,
      user_id: id,
      user_password: hashedPassword,
    });

    res.status(201).json({
      id: signupReault.user_id,
      userName: signupReault.user_name,
    });
  } catch (err) {
    console.error('회원가입 에러:', err);
    res.status(500).json({ error: '서버 오류 발생, 다시 시도하세요.' });
  }
});

router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  try {
    const loginResult = await User.findOne({
      where: {
        user_id: id,
        user_password: password,
      },
    });
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/checkUserName', async (req, res) => {
  const userName = req.query.userName;
  try {
    const checkResult = await User.findOne({
      where: {
        user_name: userName,
      },
    });
    if (checkResult) {
      res.status(200).json({ isAvailable: false });
    } else {
      res.status(200).json({ isAvailable: true });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/checkID', async (req, res) => {
  const id = req.query.id;
  try {
    const checkResult = await User.findOne({
      where: {
        user_id: id,
      },
    });
    if (checkResult) {
      res.status(200).json({ isAvailable: false });
    } else {
      res.status(200).json({ isAvailable: true });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
