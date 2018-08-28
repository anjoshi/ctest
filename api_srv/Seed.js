
const axios = require('axios'),
  _ = require('lodash'),
  Config = require('./stringify_config');

function Seed () {
  this.getNestData = (req) => {
    return new Promise((resolve, reject) => {
      const header = req.headers.Authorization;
      axios({
        method: 'get',
        url: Config.baseEndpoint + '/seeds',
        headers: {"Content-Type": "application/json", "x-stringify-version": "2.0", "Authorization" : header}
      })
      .then(obj => {
        const { seeds } = obj.data,
          seed = seeds.filter(e => {
            return e.myHubRosetta === "w1qUpEDz_1";
          });
        let returnObj = {};
        returnObj.seedId = seed[0].seedId;
        returnObj.attribSet = seed[0].attribSet;
        resolve(returnObj);
      })
      .catch(e => {
        console.log('got error from remote server !!' + e);
        reject({"message": e.message, "response": e.response});
      })
    });
  };

  this.setNestData = (req) => {
    return new Promise((resolve, reject) => {
      const header = req.headers.Authorization,
        seedId = req.body.seedId,
        attribSet = req.body.attribSet;
      axios({
        method: 'put',
        url: Config.baseEndpoint + '/' + seedId + '/controls',
        headers: {"Content-Type": "application/json", "x-stringify-version": "2.0", "Authorization" : header},
        data: attribSet
      })
      .then(obj => {
        console.log('GOT Response ' + obj);
        resolve(obj);
      })
      .catch(err => {
        console.log('got error from remote server !!' + err);
        reject({"message": err.message, "response": err.response});
      })
    });
  }
}

exports.SeedCtrl = () => {
  return new Seed();
};
