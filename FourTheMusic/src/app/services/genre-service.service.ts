import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Genre } from './genre';

@Injectable({
  providedIn: 'root'
})
export class GenreServiceService {
  private baseurl = 'http://localhost:8080/4TheMusic/genre';
  
  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
  };

  GetGenre(genre_id: number):Observable<Genre>{
    return this.http.get<Genre>(this.baseurl+'/'+genre_id).pipe(retry(1),
    catchError(this.errorHandler));
  }

  PostGenre(genre:Genre):Observable<Genre>{
    console.log(JSON.stringify(this.httpOptions.headers));
    this.httpOptions.headers = this.httpOptions.headers.set('Content-Type','application/json;charset=utf-8');
    console.log(JSON.stringify(this.httpOptions.headers));
    return this.http.post<Genre>(this.baseurl,JSON.stringify(genre),this.httpOptions).pipe(retry(1),
    catchError(this.errorHandler));
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
