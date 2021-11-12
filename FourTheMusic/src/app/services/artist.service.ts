import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Artist } from '../interfaces/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private baseurl = 'http://localhost:8080/4TheMusic/artist';
  private searchUrl = 'http://localhost:8080/4TheMusic/artist/search';

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
  };

  SearchArtists(name:String):Observable<Artist[]>{
    return this.http.get<Artist[]>(this.searchUrl+'/'+name).pipe(
      retry(1),catchError(this.errorHandler));
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
