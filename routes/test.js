const express = require("express");
const router = express.Router();

const cheerio = require("cheerio");
const request = require("request");
const Iconv = require("iconv").Iconv;
const iconv = new Iconv("CP949", "utf-8//translit//ignore");

router.get("/", function (req, res, next) {
  let url = "http://movie.naver.com/movie/sdb/rank/rmovie.nhn";

  request({ url, encoding: null }, function (error, response, body) {
    let htmlDoc = iconv.convert(body).toString();
    let resultArr = [];

    const $ = cheerio.load(htmlDoc);
    let colArr = $(".tit3");
    for (let i = 0; i < colArr.length; i++) {
      resultArr.push(colArr[i].children[1].attribs.title);
    }

    res.json(resultArr);
  });
});

module.exports = router;
