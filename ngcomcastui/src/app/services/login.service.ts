import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http ) {
  }
  public varifyCredential(id: string, password: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders = new Headers();
      const userData = {
        emailAddress: id,
        password: password,
        remoteserver: true
      };
      reqHeaders.append('Content-Type', 'application/json');
      const options = new RequestOptions({ headers: reqHeaders });
      const rootUrl = "http://localhost:8550/login";
      this.http.post(rootUrl, JSON.stringify(userData), options)
        .toPromise()
        .then(response => response.json())
        .then(authResult => this.setSession(authResult.access_token))
        .then(result => resolve(result))
        .catch((err: HttpErrorResponse) => {
          console.log('GOT Error on service call ' + JSON.stringify(err));
          reject(err)
        })
    })
  }

  private setSession(token) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('token', token);
      resolve(token);
    });
  }
  public logout() {
    localStorage.removeItem('token');
  };

}
