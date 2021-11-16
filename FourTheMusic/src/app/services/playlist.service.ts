import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Playlist, Track } from '../interfaces/playlist';
import { PlaylistTrack } from '../interfaces/playlist-track';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseurl = 'http://localhost:8080/4TheMusic/playlist';

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
  };

  GetPlaylist(playlist_id:number):Observable<Playlist>{
    return this.http.get<Playlist>(this.baseurl+'/'+playlist_id).pipe(
      retry(1),catchError(this.errorHandler));
  }

  GetTracksFromPlaylist(playlist_id:number):Observable<Track[]>{
    return this.http.get<Track[]>(this.baseurl+'/tracks/'+playlist_id).pipe(
      retry(1),catchError(this.errorHandler));
  }

  PostPlaylist(playlist:Playlist):Observable<Playlist>{
    const userToken = localStorage.getItem('token ');
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Content-Type','application/json;charset=utf-8');
      return this.http.post<Playlist>(this.baseurl+'/'+userToken,JSON.stringify(playlist),this.httpOptions).pipe(
        retry(1),catchError(this.errorHandler));
  }

  GetPlaylistsByUser():Observable<Playlist[]>{
    const userToken = localStorage.getItem('token ');
    return this.http.get<Playlist[]>(this.baseurl+'/user/'+userToken).pipe(
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
