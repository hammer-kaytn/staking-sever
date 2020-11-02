const app = require('express').Router();
const axios = require('axios');
const youtubeApi = process.env.YOUTUBEAPI;

// 코드 값으로 조회
app.get('/:code', function (req, res) {
  const url = 'https://www.googleapis.com/youtube/v3/videos';
  axios
    .get(url, {
      params: {
        id: req.params.code,
        key: youtubeApi,
        part: 'snippet,statistics',
        fields:
          'items(id,snippet(channelId,title,description,tags,thumbnails),statistics)',
      },
    })
    .then(function (response) {
      res.json(response.data.items[0]);
    })
    .then(function (err) {
      if (err) {
        console.error('error: ' + err);
      }
    });
});

module.exports = app;
