import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';
import { AuthInterceptor } from '../interceptor/auth.interceptor';



 interface newUser {
    token: string,
    firstName: string,
    lastName: string,
    city: string,
    state: string,
    username: string,
    password: string,
    email: string
}

interface logUser {
  token: string;
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
 
getAuthToken(){
  return 'token'
}

private apiUrl = 'http://localhost:8080/4TheMusic/';

private httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Authorization': `token`})
};

// private handleError : any;


  constructor(private http: HttpClient) {}


  //user login
  userLogin(logUser : logUser): Observable<logUser> {
    return this.http.post<logUser>(this.apiUrl + 'login', 
    JSON.stringify(logUser),
    this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // gettoken() {
    
  // }
  // `${APIURL}/user/${this.state.login ? 'login' : 'signup'}`


  //register function
  userRegister(newUser: newUser): Observable<newUser> {
  console.log(newUser),
   console.log(newUser.firstName)
   console.log(this.httpOptions)

   this.httpOptions.headers =
   this.httpOptions.headers.set('Authorization', `this.token`);
   localStorage.setItem('token', `this.token`)
   console.log( localStorage.setItem('token', `this.token`))
    let result = this.http.post<newUser>(this.apiUrl + 'register/basic',
    JSON.stringify(newUser),
  this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
     
    )
    console.log(result)
    return result;
  }

  handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(() => error)
  }

  //logout function
  loggedOut() {
    return localStorage.clear()
  }

}
