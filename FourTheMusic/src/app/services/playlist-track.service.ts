import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { PlaylistTrack } from '../interfaces/playlist-track';
import { Track } from '../interfaces/track';

@Injectable({
  providedIn: 'root'
})
export class PlaylistTrackService {

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
  };

  RemoveFromPlaylist(playlist_id:number,track_id:number):Observable<PlaylistTrack>{
    console.log("Reached");
    console.log(playlist_id);
    console.log(track_id);
    return this.http.delete<PlaylistTrack>('http://localhost:8080/4TheMusic/remove/'+playlist_id+'/'+track_id).pipe(
      retry(1),catchError(this.errorHandler));
    console.log("Reached2");  
  }

  AddTrackToPlaylist(playlist_id:number,track:Track):Observable<PlaylistTrack>{
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type','application/json;charset=utf-8');
    return this.http.post<PlaylistTrack>('http://localhost:8080/4TheMusic/add/'+playlist_id,JSON.stringify(track),this.httpOptions).pipe(
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
