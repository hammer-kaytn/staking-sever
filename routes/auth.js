require('dotenv').config();
const app = require('express').Router();
const Cache = require('memory-cache');
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

app.post('/', (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  Cache.del(phoneNumber);

  let verifyCode = Math.floor(Math.random() * 1000000) + 100000;
  if (verifyCode > 1000000) {
    verifyCode = verifyCode - 100000;
  }

  Cache.put(phoneNumber, verifyCode.toString());

  //   try {
  //     client.messages
  //       .create({
  //         body: `[하트링크] 인증번호는 ${verifyCode} 입니다.`,
  //         from: '+12246430642',
  //         to: `+82${phoneNumber}`,
  //       })
  //       .then((message) => console.log(message.sid));
  //   } catch (error) {
  //     console.log(error);
  //   }
  return res.send(`인증번호가 발송되었습니다. ${verifyCode}`);
});

app.post('/verify', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const verifyCode = req.body.verifyCode;

  const CacheData = Cache.get(phoneNumber);

  if (!CacheData) {
    return res.send('fail');
  } else if (CacheData !== verifyCode) {
    return res.send('fail');
  } else {
    Cache.del(phoneNumber);
    return res.send('success');
  }
});

module.exports = app;
