import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Location } from 'src/app/interfaces/location'

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseurl = 'http://localhost:8080/4TheMusic/location';

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
  };

  GetLocation(location_id:number):Observable<Location>{
    return this.http.get<Location>(this.baseurl+'/'+location_id).pipe(
      retry(1),catchError(this.errorHandler));
  }

  PostLocation(location:Location):Observable<Location>{
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type','application/json;charset=utf-8');
    return this.http.post<Location>(this.baseurl,JSON.stringify(location),this.httpOptions).pipe(
      retry(1),catchError(this.errorHandler));
  }

  DeleteLocation(location_id:number):Observable<Location>{
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type','application/json;charset=utf-8');
    return this.http.delete<Location>(this.baseurl);
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
