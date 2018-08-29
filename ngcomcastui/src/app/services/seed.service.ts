import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  constructor(private http: Http ) {
  }
  public getNestDetails() : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const reqHeaders = new Headers();
      const idToken = localStorage.getItem("token"),
        bearer = 'Bearer ' + idToken;
      reqHeaders.append('Authorization', bearer);
      reqHeaders.append('Content-Type', 'application/json');
      const options = new RequestOptions({ headers: reqHeaders });
      const rootUrl = "https://api.stringify.com/v2/seeds";
      this.http.get(rootUrl, options)
        .toPromise()
        .then(response => response.json())
        .then(response => {
          const { seeds } = response,
            seedArr = seeds.filter(e => {
              return e.myHubRosetta === "w1qUpEDz_1";
            });
          let returnObj = {
            "seedId": null,
            "attribSet": []
            },
            seed = seedArr[0],
            { seedId, attribSet } = seed;
          returnObj.seedId = seedId;
          returnObj.attribSet = attribSet;
          resolve(returnObj);
        })
        .catch((err: HttpErrorResponse) => {
          console.log('GOT Error on service call ' + JSON.stringify(err));
          reject(err)
        })
    });
  }
  public setNestData(seedId, attribSet) : Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders = new Headers();
      const idToken = localStorage.getItem("token"),
        bearer = 'Bearer ' + idToken;
      reqHeaders.append('Authorization', bearer);
      reqHeaders.append('Content-Type', 'application/json');
      const options = new RequestOptions({ headers: reqHeaders });
      const rootUrl = "https://api.stringify.com/v2/" + seedId + '/controls';
      const userData = {
        attribSet
      };
      this.http.put(rootUrl, userData, options)
        .toPromise()
        .then(response => response.json())
        .then(response => {
          console.log('got the response');
          resolve(response);
        })
        .catch((err: HttpErrorResponse) => {
          console.log('GOT Error on service call ' + JSON.stringify(err));
          reject(err)
        })
    });
  }
}
