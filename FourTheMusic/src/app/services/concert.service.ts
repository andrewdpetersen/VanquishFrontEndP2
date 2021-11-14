import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Concert } from '../interfaces/concert';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private baseurl = 'http://localhost:8080/4TheMusic/concert';

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
  };
  
  GetConcert(concert_id:number):Observable<Concert>{
    return this.http.get<Concert>(this.baseurl+'/'+concert_id).pipe(
      retry(1),catchError(this.errorHandler));
  }

  PostConcert(concert:Concert):Observable<Concert>{
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type','application/json;charset=utf-8');
    return this.http.post<Concert>(this.baseurl,JSON.stringify(concert),this.httpOptions).pipe(
        retry(1),catchError(this.errorHandler));
  }

  DeleteConcert(concert_id:number):Observable<Concert>{
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type','application/json;charset=utf-8');
    return this.http.delete<Concert>(this.baseurl+'/'+concert_id);
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
