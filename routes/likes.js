const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");

const url =
  "https://store.steampowered.com/search/?specials=1&ignore_preferences=1";

const getHtml = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  getHtml(url).then((html) => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div#search_resultsRows").children("a");
    $bodyList.each(function (i, elem) {
      const price = $(this)
        .find("div.search_price")
        .text()
        .replace(/,/gi, "")
        .replace(/ /gi, "")
        .split("₩");
      ulList[i] = {
        title: $(this).find("span.title").text(),
        sale: $(this).find("div.search_discount span").text(),
        original: price[1],
        salePrice: price[2],
        href: $(this).attr("href"),
        imgSrc: $(this).find("div.col.search_capsule img").attr("src"),
      };
    });
    const data = ulList.filter((n) => n.title);
    return res.json(data);
  });
});

module.exports = router;
