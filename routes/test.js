const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  let data = [];

  for (let index = 1; index <= 3; index++) {
    await page.goto(
      "https://sw.cau.ac.kr/core/program/programalllist?menuid=001004001004&searchallyn=Y&currentpage=" +
        index
    );
    data.push(await getAll(page));
  }
  console.log(data);

  await page.waitFor(10000);
  await browser.close();
})();

async function getAll(page) {
  let data = [];

  const number = await page.$$eval(
    "#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr",
    (data) => data.length
  );
  // tr태그의 개수를 세어서 줄의 개수를 얻은 후에
  for (let index = 0; index < number; index++) {
    data.push(await getOne(page, index + 1));
    // 각 줄의 정보를 얻어서 배열에 Push
  }

  return Promise.resolve(data);
}

async function getOne(page, index) {
  let data = {};

  let temp = await page.$(
    "#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" +
      index +
      ") > td:nth-child(3) > a"
  );

  // nth-child(index)를 이용해 원하는 줄을 선택할 수 있도록 한다.

  data.name = await page.evaluate((data) => {
    return data.textContent;
  }, temp);
  data.link = await page.evaluate((data) => {
    return data.href;
  }, temp);

  data.programPeriod = await page.$eval(
    "#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" +
      index +
      ") > td:nth-child(5)",
    (data) => data.textContent
  );

  data.applyingPeriod = await page.$eval(
    "#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" +
      index +
      ") > td:nth-child(6)",
    (data) => data.textContent
  );

  data.count = await page.$eval(
    "#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" +
      index +
      ") > td:nth-child(7)",
    (data) => data.textContent
  );

  data.state = await page.$eval(
    "#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" +
      index +
      ") > td:nth-child(8)",
    (data) => data.textContent
  );

  return Promise.resolve(data);
}
