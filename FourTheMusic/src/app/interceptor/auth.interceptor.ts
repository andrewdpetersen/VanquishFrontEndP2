import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly token: Object | any;

  constructor(private authService : AuthenticationService) {
    this.token = localStorage.getItem('token')
    // JSON.parse(this.token).toString();
    console.log(this.token);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): 
  Observable<HttpEvent<any>> {

   
    // if(this.token) {
    //   const modReq = request.clone({
    //     setHeaders: { 
    //       'token': this.token
    //     }
    //   })
    //   return next.handle(modReq)
    // }
    // return next.handle(request);
    // get token from authservice


    // const token = this.authService.getAuthToken();

  


    //clone request and replace original header with updated Authorization
    // clone request and set new header 

    const authReq = request.clone({
      setHeaders: {
        Authorization: this.token
      }
    })

    return next.handle(authReq);
  }
}
