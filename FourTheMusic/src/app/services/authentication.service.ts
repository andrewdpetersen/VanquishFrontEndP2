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
  userLogin(logUser : logUser): Observable<logUser> {

    localStorage.setItem('token '  , logUser.username)
    localStorage.setItem('User ', logUser.password && logUser.username)
    let userToken = localStorage.getItem('token ')
    console.log(userToken)
    return this.http.post<logUser>(this.apiUrl + 'login', 
    JSON.stringify(logUser),
    this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
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
  userRegister(newUser: newUser): Observable<newUser> {
  console.log(newUser),
   console.log(newUser.firstName)
   console.log(this.httpOptions)
  
   localStorage.setItem('token '  , newUser.username)
   localStorage.setItem('firstName', newUser.firstName)
    let userToken = localStorage.getItem('token ')
  
   console.log(userToken);

    return this.http.post<newUser>(this.apiUrl + 'user/register/basic',
    JSON.stringify(newUser),
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

  authUser(newUser:any) {
    let UserArr = []
    if(localStorage.getItem('firstName')) {
      UserArr = JSON.parse(newUser.firstName)
    }
    return UserArr.find((p: { firstName: any; }) => p.firstName === newUser.firstName)
  }


  //logout function
  loggedOut() {
    localStorage.clear()
    alert("Leaving so soon")
    this.router.navigate(['/'])
  }

}


