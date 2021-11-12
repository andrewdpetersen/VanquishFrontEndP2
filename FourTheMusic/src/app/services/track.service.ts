import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Track } from '../interfaces/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private baseurl = 'http://localhost:8080/4TheMusic/track';
  private searchUrl = 'http://localhost:8080/4TheMusic/search';

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
  };

  GetTrack(track_id:number):Observable<Track>{
    return this.http.get<Track>(this.baseurl+'/'+track_id).pipe(
      retry(1),catchError(this.errorHandler));
  }

  SearchTracks(title:String):Observable<Track[]>{
    return this.http.get<Track[]>(this.searchUrl+'/'+title).pipe(
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
