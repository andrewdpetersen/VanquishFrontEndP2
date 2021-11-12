import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

 interface newUser {
    token: string;
    firstname: string,
    lastname: string,
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
  
private apiUrl = 'http://localhost:8080/4TheMusic/';

private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'token'}),
};
// private handleError : any;


  constructor(private http: HttpClient) {}


  //user login
  userLogin(logUser : logUser): Observable<logUser> {
    this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json;charset=utf-8').set('Authorization', 'token')
    console.log(JSON.stringify(this.httpOptions.headers))
    return this.http.post<logUser>(this.apiUrl + 'login', 
    JSON.stringify(logUser.token),
    this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // `${APIURL}/user/${this.state.login ? 'login' : 'signup'}`
 

  public newHead = this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json;charset=utf-8')


  //register function
  userRegister(newUser: newUser): Observable<newUser> {
   this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json;charset=utf-8').set('Authentication', 'token')
   console.log(JSON.stringify(this.httpOptions.headers))
    return this.http.post<newUser>(this.apiUrl + 'user/register/basic',
    JSON.stringify(newUser.token),
  this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(() => error)
  }

  //logout function
  loggedOut() {
    return localStorage.clear()
  }
  // errorHand1(error:any) {
  //   let errorMessage = ''
  //   if(error.error instanceof ErrorEvent) {
  //     errorMessage = error.error.message;
  //   } else {
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
  //   }
  //   console.log(errorMessage)
  //   return throwError(() =>errorMessage);
  // }

  // userRegister(firstname: string, lastname: string, city: string, 
  //   state: string, username: string, password: string, 
  //   email: string): Observable<any> {
  //   return this.http.post(this.apiUrl + 'register', {
  //     firstname, lastname, city, state, username,
  //     password,email
  //   }, this.httpOptions)
  // }
}
