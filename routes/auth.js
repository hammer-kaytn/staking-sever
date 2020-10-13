require('dotenv').config();
const app = require('express').Router();
const Cache = require('memory-cache');
const request = require('request');
const CryptoJS = require('crypto-js');

// 환경변수 설정
const NCP_serviceID = process.env.SERVICEID;
const NCP_accessKey = process.env.ACCESSKEY;
const NCP_secretKey = process.env.SECRETKEY;

// 네이버 Signiture API
const date = Date.now().toString();
const uri = NCP_serviceID;
const secretKey = NCP_secretKey;
const accessKey = NCP_accessKey;
const method = 'POST';
const space = ' ';
const newLine = '\n';
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
const url2 = `/sms/v2/services/${uri}/messages`;

const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(accessKey);

const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);

app.post('/', function (req, res) {
  const phoneNumber = req.body.phoneNumber;

  Cache.del(phoneNumber);

  //인증번호 생성
  const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

  Cache.put(phoneNumber, verifyCode.toString());

  request(
    {
      method: method,
      json: true,
      uri: url,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': NCP_accessKey,
        'x-ncp-apigw-timestamp': date,
        'x-ncp-apigw-signature-v2': signature,
      },
      body: {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: '01032587579',
        content: `[하트링크] 인증번호는 ${verifyCode} 입니다.`,
        messages: [
          {
            to: `${phoneNumber}`,
          },
        ],
      },
    },
    function (err, res, html) {
      if (err) console.log(err);
      else {
        console.log(html);
      }
    },
  );

  res.json('인증번호가 발송되었습니다.');
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
