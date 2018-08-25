const http = require('http'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  morgan = require('morgan'),
  responseTime = require('response-time'),
  Auth = require('./Auth').AuthCtrl(),
  Config = require('./stringify_config');

app.use(morgan('combined'));
app.use(responseTime());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let Seed = (() => {
  let { seeds } = Config.seeds;
  return {
    getSeeds: () => {
      return seeds;
    },
    updateSeeds : (id, data) => {
      let seed = seeds.find((e) => {
        return id === e.seedId;
      });
      if(seed) {
        seed.attribSet[0].temperature = data.attribSet[0].temperature;
      }
    }
  }
})();

app.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).end(JSON.stringify({message: "hello world from /test"}));
});

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
      res.status(501).end(JSON.stringify({"Error": err}));
    })
  }
});

const varifyToken = (req, res, next) => {
  return new Promise((resolve, reject) => {
    const AuthMessage = req.get('Authorization'),
      AuthArr = AuthMessage.split(' '),
      token = AuthArr[1];
    Auth.varifyToken(token)
    .then(claim => {
      resolve(next())
    })
    .catch(err => {
      console.log('Error ' + err);
      res.setHeader('Content-Type', 'application/json');
      res.status(501).end(JSON.stringify({"Error": err}));
    });
  });
};

app.get('/seeds', varifyToken, (req, res) => {
  let seed = Seed.getSeeds();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(seed);
});
app.put('/seeds/:id/controls', varifyToken, (req, res) => {
  let id = req.params.id,
    attribSet = req.body;
  Seed.updateSeeds(id, attribSet);

  let temp = Seed.getSeeds().find((e) => {
    return id === e.seedId;
  }).attribSet[0].temperature;

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(temp);
});


http.createServer(app)
.listen(8550, () => {
  console.log('http server started at 8550');
});