import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';
import { Router } from '@angular/router';




 interface newUser {
    firstName: string,
    lastName: string,
    city: string,
    state: string,
    username: string,
    password: string,
    email: string
}

 export interface logUser {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {


private apiUrl = 'http://localhost:8080/4TheMusic/';

private httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Authorization': 'token'})
};
  


  constructor(private http: HttpClient, private router: Router) {
  

  }

  //user login
  /**
   * @author Erika Johnson
   * @param newUser
   *  @param logUser
   * @returns
   *  Once a user registers/signs in, they are given a token,
   * [Normally we would use a JWT token but in this instance we are utilizing the users username]
   * which will track their requests through-out
   * the application, until they sign out
   */

   userLogin(logUser: logUser): Observable<logUser> {
    localStorage.setItem('token', logUser.username);
    let userToken = localStorage.getItem('token');
    console.log(userToken);
    return this.http
      .post<logUser>(
        this.apiUrl + 'login',
        JSON.stringify(logUser),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

/**
   * @author Erika Johnson
   * @returns
   * getToken and isLoggedIn functions are used in the auth.guard.ts file
   * to verify that the premium user is logged in and has a token upon logging in
   */

 getToken(): string | null {
  return localStorage.getItem('token');
}
 
  isLoggedIn() {
    return this.getToken() !== null;
  }

 



/**
 * @author Erika Johnson
 * @param newUser 
 * @returns 
 *  Once a user registers/signs in, they are given a token, 
 * [Normally we would use a JWT token but in this instance we are utilizing the users username]
 * which will track their requests through-out
 * the application, until they sign out
 */


  //register function
  /**
 * User Registration
 */
   userRegister(newUser: newUser): Observable<newUser> {
    console.log(newUser), console.log(newUser.firstName);
    console.log(this.httpOptions);
    localStorage.setItem('token ', newUser.username);
    localStorage.setItem('firstName', newUser.firstName);
    let userToken = localStorage.getItem('token ');
    console.log(userToken);
    return this.http
      .post<newUser>(
        this.apiUrl + 'user/register/basic',
        JSON.stringify(newUser),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error);
  }

  /**
   * @author Erika Johnson
   * Logout Function clears the token from the
   * LocalStorage, so user data isn't being stored
   * within the application, once they leave
   */

  loggedOut() {
    localStorage.clear()
    alert("Leaving so soon")
    this.router.navigate(['/'])
  }

}


