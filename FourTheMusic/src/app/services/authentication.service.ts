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
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `token`}),
    observe: "response",
    responseType: "json",
    withCredentials: true
  };

  // private handleError : any;


  constructor(private http: HttpClient) {}


  //user login
  userLogin(logUser : logUser) {
    return this.http.post<logUser>(this.apiUrl + 'login', JSON.stringify(logUser),{
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: "response",
      responseType: "json"
    })
      .pipe(retry(1), catchError(this.handleError))
      .subscribe(resp => {
        console.log(resp.headers.get("Authorization"));
        console.log(resp.body);
      });
  }

  // gettoken() {

  // }
  // `${APIURL}/user/${this.state.login ? 'login' : 'signup'}`


  //register function
  userRegister(newUser: newUser){
    console.log(newUser)

    let result = this.http.post<newUser>(this.apiUrl + 'register/basic', JSON.stringify(newUser), {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Authorization': ``}),
      observe: "response",
      responseType: "json"
    })
      .pipe(retry(1), catchError(this.handleError))
      .subscribe(resp => {
        console.log((resp.headers.getAll('Authorization')));
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
