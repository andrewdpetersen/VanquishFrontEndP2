import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';
import { AuthInterceptor } from '../interceptor/auth.interceptor';



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
  username: string,
  password: string
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  getAuthToken(){
    return 'token'
  }

  private apiUrl = 'http://localhost:8080/4TheMusic/';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Token': ``}),
    observe: "response",
    responseType: "json",
    withCredentials: true
  };

  constructor(private http: HttpClient) {}

  //user login
  userLogin(logUser : logUser) {
    this.httpOptions.headers.set('Content-Type', 'application/json')

    this.httpOptions.headers.append('Token', logUser.username)

    return this.http.post<logUser>(this.apiUrl + 'login', JSON.stringify(logUser),{
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: "response",
      responseType: "json"
    })
      .pipe(retry(1), catchError(this.handleError))
      .subscribe(resp => {
        console.log(resp.headers.keys());
        console.log(resp.body);
      });
  }

  //register function
  userRegister(newUser: newUser){
    console.log(newUser)

    let result = this.http.post<newUser>(this.apiUrl + 'register/basic', JSON.stringify(newUser), {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Token': ``}),
      observe: "response",
      responseType: "json"
    })
      .pipe(retry(1), catchError(this.handleError))
      .subscribe(resp => {
        console.log((resp.headers.getAll('Token')));
      });

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
