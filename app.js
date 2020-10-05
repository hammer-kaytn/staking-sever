require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('몽고DB 연결');
  })
  .catch((e) => {
    console.error(e);
  });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const transfersRouter = require('./routes/transfers'); // txList 라우터
const accountRouter = require('./routes/accounts'); // SNS계정 연동 라우터
const testRouter = require('./routes/test');

app.use('/api/transfers', transfersRouter); //txList 라우터
app.use('/api/accounts', accountRouter); // SNS계정 연동 라우터
app.use('/api/test', testRouter);

app.listen(PORT, () => console.log(`서버 연결 ${PORT}`));
