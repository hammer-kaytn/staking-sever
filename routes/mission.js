const app = require('express').Router();
const Mission = require('../models/missionModel');

// 미션 데이터 생성
app.post('/', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  const mission = new Mission();

  mission.category = req.body.category;
  mission.account = req.body.account;
  mission.page = req.body.page;
  mission.tag = req.body.tag;
  mission.goal = req.body.goal;
  mission.reward = req.body.reward;
  mission.missionId = req.body.missionId;
  mission.deadline = req.body.deadline;

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
  });
});

//특정 미션 조회
app.get('/:id', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  let id = req.params.id;
  console.log(req.params);
  Mission.findById(id, function(err, mission) {
    // if(err) return res.status(500).json({error: err});
    // if(!mission) return res.status(404).json({error: 'mission not found'});
    res.json(mission);
  })
  
});


//카테고리 매칭
// app.get('/:category', function(req, res){
//   Mission.find( req.params.category, function (err, missions) {
//     if(err) throw err;
//     res.json(missions);
//     console.log(missions);
//   }) 

  
// });

module.exports = app;
