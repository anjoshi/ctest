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
      reqHeaders.append('Content-Type', 'application/json');
      const options = new RequestOptions({ headers: reqHeaders });
      const rootUrl = "http://localhost:8550/nestdata";
      this.http.get(rootUrl, options)
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

  public setNestData(seedId, attribSet) : Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders = new Headers();
      reqHeaders.append('Content-Type', 'application/json');
      const options = new RequestOptions({ headers: reqHeaders });
      const rootUrl = "http://localhost:8550/setnestdata";
      const userData = {
        seedId,
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
