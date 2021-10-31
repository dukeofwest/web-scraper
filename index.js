const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");

const PORT = 3000;

const app = express();

const URL = "https://edition.cnn.com/world";

app.get("/", function (req, res) {
  res.json("Welcome to my Web Scraper");
});

app.get("/news", function (req, res) {
  axios(URL)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".cd__headline", html).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");
        articles.push({
          title,
          url,
        });
      });

      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
