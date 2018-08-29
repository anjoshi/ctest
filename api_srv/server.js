const http = require('http'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  morgan = require('morgan'),
  responseTime = require('response-time'),
  Auth = require('./Auth').AuthCtrl();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, api-key");
  next();
});
app.use(morgan('combined'));
app.use(responseTime());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/login', (req, res) => {
  const userName = req.body.emailAddress,
    password = req.body.password;
  if(!userName || !password) {
    res.setHeader('Content-Type', 'application/json');
    res.status(401).end(JSON.stringify({"token": "Error"}));
  } else {
    Auth.login(userName, password)
    .then(token => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).end(JSON.stringify({"access_token": token}));
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(401).end(err.message);
    })
  }
});

http.createServer(app)
.listen(8550, () => {
  console.log('http server started at 8550');
});