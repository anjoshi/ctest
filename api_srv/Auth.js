

const  Config = require('./stringify_config'),
  axios = require('axios'),
  crypto = require('crypto');

function Auth () {
  this.login = (username, password) => {
    return new Promise((resolve, reject) => {
      const newPwd = password + username + 'stringify',
        hashedPwd = crypto.createHash('sha256').update(newPwd).digest('base64');
      axios({
        method: 'post',
        url: Config.baseEndpoint + '/login',
        headers: {"Content-Type": "application/json", "x-stringify-version": "2.0"},
        data: {
          emailAddress: username,
          password: hashedPwd
        }
      })
      .then(obj => {
        resolve(obj.data.access_token);
      })
      .catch(err => {
        console.log('got error from remote server !!' + err);
        reject(err);
      })
    });
  };
}
exports.AuthCtrl = () => {
  return new Auth();
};