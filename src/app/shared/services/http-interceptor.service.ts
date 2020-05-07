import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from './authentication-service.service';



//This service will check if the session has a valid username and basicauth String,
//then it will update the headers of all outgoing HTTP requests. 
// We implement the interceptor by extending the HttpInterceptor.

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {




  constructor(private authenticationService: AuthenticationServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (this.authenticationService.isUserLoggedIn() ) {
          const authReq = req.clone({
              headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
              })
          });
          return next.handle(authReq);
      } else {
          return next.handle(req);
      }
  }
}
