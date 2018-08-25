
const  { promisify } = require('util'),
  JWT = require('jsonwebtoken'),
  JWTSignPromise = promisify(JWT.sign),
  { JWT_SECRET } = require('./JWT_SECRET'),
  Config = require('./stringify_config');

function Auth () {
  const varifyCredential = (username, password) => {
    return new Promise((resolve, reject) => {
      if(username === Config.username && password === Config.password) {
        resolve({"data": "OK"});
      } else {
        reject({"data" : "UserId/Password Mismatch."});
      }
    })
  },
  signOnToken = (username) => {
    return new Promise((resolve, reject) => {
      JWTSignPromise({
        iss: 'ApiAuth',
        sub: username,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + Config.AuthTimeout
      }, JWT_SECRET)
      .then((token) => resolve(token))
      .catch((err) => reject(err));
    });
  };
  this.login = (username, password) => {
    return new Promise((resolve, reject) => {
      varifyCredential(username, password)
      .then(obj => {
        if (obj.data === "OK") {
          return signOnToken(username);
        }
      })
      .then(token => resolve(token))
      .catch(err => {
        if(err.data && err.data === "UserId/Password Mismatch.") {
          reject(err);
        }
      });
    });
  };
  this.varifyToken = (token) => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, JWT_SECRET, {
        algorithms: ['HS256']
      }, (err, claim) => {
        if(err) {
          reject(err);
        } else {
          resolve(claim);
        }
      });
    });
  };
}
exports.AuthCtrl = () => {
  return new Auth();
};