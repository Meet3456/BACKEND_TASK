const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = "f89f34b69b8315689d8347986e004a07"
// console.log(apiKey.key);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${fToC(weather.main.temp)} degree Celcius in ${weather.name}!`;
        let weatherTextExpanded = `It's ${fToC(weather.main.temp)} degrees, with
          ${weather.main.humidity}% humidity in ${weather.name}!`;
        res.render('index', {weather: weatherTextExpanded, error: null});
      }
    }
  });
})

function fToC(temp){
  var ftemp = temp;
  var ftocel = Math.round((ftemp-32)*5/9);
  var message = ftocel + '\xB0C.'
  return message
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
