const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const location = req.body.cityName;
  console.log(location);
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=36cb8aa37c9c698d0e1f3f81e3ab9998";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const desc = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imgurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>TEMP:" + temp + "</h1>");
      res.write("<p>" + desc + "</p>");
      res.write("<img src=" + imgurl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("3000 working");
});
