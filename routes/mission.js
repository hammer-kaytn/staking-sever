const app = require('express').Router();
const Mission = require('../models/missionModel');

// 미션 데이터 생성
app.post('/', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  const mission = new Mission();
  const tDate = new Date();

  mission.category = req.body.category;
  mission.account = req.body.account;
  mission.page = req.body.page;
  mission.tag = req.body.tag;
  mission.goal = req.body.goal;
  mission.reward = req.body.reward;
  mission.missionId = req.body.missionId;
  mission.deadline = tDate.setDate(tDate.getDate() + 30);
  mission.title = req.body.title;
  mission.image = req.body.image;
  mission.content = req.body.content;
  mission.status = '진행중';
  mission.presentLikes = req.body.presentLikes;
  mission.code = req.body.code;

  mission.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: '생성 실패' });
      return;
    }

    res.json({ result: '생성 성공' });
  });
});

//모든 미션 조회
app.get('/list', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  Mission.find(function (err, missions) {
    if (err) return res.status(500).send({ error: '데이터 없음' });
    res.json(missions);
  }).sort({ _id: -1 });
});

// missionId 값으로 조회
app.get('/:missionId', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  Mission.findOne({ missionId: req.params.missionId }, function (err, mission) {
    if (err) return res.status(500).json({ error: err });
    if (!mission) return res.status(404).json({ error: '데이터가 없습니다.' });
    res.json(mission);
  });
});

// account 값으로 조회
app.get('/account/:address', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  Mission.find({ account: req.params.address }, function (err, mission) {
    if (err) return res.status(500).json({ error: err });
    if (!mission) return res.status(404).json({ error: '데이터가 없습니다.' });
    res.json(mission);
  });
});

// 내가 참여한 미션인지 확인
app.get('/participateList/:address', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  Mission.find(
    {
      participateList: {
        $elemMatch: { account: req.params.address },
      },
    },
    function (err, mission) {
      if (err) return res.status(500).json({ error: err });
      if (!mission)
        return res.status(404).json({ error: '데이터가 없습니다.' });
      res.json(mission);
    },
  );
});

// 상태가 진행중인 최근 5개 미션 조회
app.get('/lists/recent', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  Mission.find({ status: '진행중' }, function (err, category) {
    if (err) return res.status(500).json({ error: err });
    if (!category) return res.status(404).json({ error: '데이터가 없습니다.' });
    res.json(category);
  })
    .limit(5)
    .sort({ _id: -1 });
});

// 미션 참여기록 추가
app.post('/updateMission', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결

  Mission.findOneAndUpdate(
    { missionId: req.body.missionId },
    {
      $push: {
        participateList: {
          account: req.body.account,
        },
      },
      $inc: { likes: 1 },
    },
    function (err) {
      if (err) {
        console.error(err);
        res.json({ result: '미션 업데이트 실패' });
        return;
      }

      res.json({ result: '미션 업데이트 성공' });
    },
  );
});

// 미션 상태 수정
app.post('/updateStatus', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결

  Mission.findOneAndUpdate(
    { missionId: req.body.missionId },
    { $set: { status: req.body.status } },
    function (err) {
      if (err) {
        console.error(err);
        res.json({ result: '미션 상태 수정 실패' });
        return;
      }

      res.json({ result: '미션 상태 수정 성공' });
    },
  );
});

module.exports = app;
