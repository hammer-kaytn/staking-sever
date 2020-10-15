const app = require('express').Router();
const Account = require('../models/accountModel');

// 모든 데이터 조회
app.get('/', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  Account.find(function (err, accounts) {
    if (err) return res.status(500).send({ error: '데이터 없음' });
    res.json(accounts);
  });
});

// address 값으로 조회
app.get('/:address', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  Account.findOne({ address: req.params.address }, function (err, book) {
    if (err) return res.status(500).json({ error: err });
    if (!book) return res.status(404).json({ error: '데이터가 없습니다.' });
    res.json(book);
  });
});

// phoneNumber 값으로 조회
app.get('/phone/:phoneNumber', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  Account.findOne({ phoneNumber: req.params.phoneNumber }, function (
    err,
    book,
  ) {
    if (err) return res.status(500).json({ error: err });
    if (!book) return res.status(404).json({ error: '데이터가 없습니다.' });
    res.json(book);
  });
});

// 계정 데이터 생성
app.post('/', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  const account = new Account();

  account.address = req.body.account;
  account.phoneNumber = req.body.phoneNumber;

  account.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: '생성 실패' });
      return;
    }

    res.json({ result: '생성 성공' });
  });
});

// 계정 데이터 수정
app.post('/update', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결

  Account.findOneAndUpdate(
    { address: req.body.account },
    { $set: { phoneNumber: req.body.phoneNumber } },
    function (err) {
      if (err) {
        console.error(err);
        res.json({ result: '수정 실패' });
        return;
      }

      res.json({ result: '수정 성공' });
    },
  );
});

module.exports = app;
