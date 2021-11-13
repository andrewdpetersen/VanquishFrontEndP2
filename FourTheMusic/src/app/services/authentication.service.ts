import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

interface newUser {
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
    return localStorage.getItem('token');
  }

  private apiUrl = 'http://localhost:8080/4TheMusic/';

  private httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json', 'Authorization': `token`})
  };

  constructor(private http: HttpClient) {

  }

  //user login
  userLogin(logUser : logUser): Observable<logUser> {
    this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json;charset=utf-8').set('Authentication', 'token')
    console.log(JSON.stringify(this.httpOptions.headers))

    return this.http.post<logUser>(this.apiUrl + 'login',
    JSON.stringify(logUser),
    this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //register function
  userRegister(newUser: newUser): Observable<newUser> {
   console.log(newUser)

    let result = this.http.post<newUser>(this.apiUrl + 'register/basic', JSON.stringify(newUser), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )

    console.log(result);
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
