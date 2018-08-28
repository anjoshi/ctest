import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor() { }
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("token"),
      bearer = 'Bearer ' + idToken;
    if(req.method === 'POST' && req.url.indexOf('/login') !== -1) {
      return next.handle(req);
    } else if (idToken) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', bearer).append('Content-Type', 'application/json')
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}