const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    exposedHeaders: ['Authorization'],
    credentials: true,
  })
);

app.use(express.json());

//Routers
const userRouter = require('./routes/User');
app.use('/user', userRouter);
const movieRouter = require('./routes/Movie');
app.use('/movie', movieRouter);
const boardRouter = require('./routes/Board');
app.use('/board', boardRouter);
const ratingRouter = require('./routes/Rating');
app.use('/rating', ratingRouter);
const authRouter = require('./routes/Auth');
app.use('/auth', authRouter);

db.sequelize.sync().then(() => {
  app.listen(3003, () => {
    console.log('Server running on port 3003');
  });
});
