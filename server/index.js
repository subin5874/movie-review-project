const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
//const session = require('express-session');

app.use(express.json());
app.use(cors());

//Routers
const userRouter = require('./routes/User');
app.use('/user', userRouter);

db.sequelize.sync().then(() => {
  app.listen(3003, () => {
    console.log('Server running on port 3003');
  });
});
