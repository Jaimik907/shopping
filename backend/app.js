const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./utils/database');
const cors = require('cors');
const userRoute = require('./src/users/router/user.router');
const authRoute = require('./src/auth/router/auth.router');

dotenv.config();
const port = process.env.PORT;

const app = express();
let corsOption = {
  origin: 'https//localhost:3000',
};

app.use(express.json());
app.use(cors(corsOption));

app.use('/users', userRoute);
app.use('/',authRoute);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = app;
