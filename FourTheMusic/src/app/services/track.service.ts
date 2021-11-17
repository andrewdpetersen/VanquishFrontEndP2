import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Album } from '../interfaces/album';
import { Track } from '../interfaces/track';

import { AuthenticationService } from './authentication.service';

import { Ratio } from '../ratio';


@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private baseurl = 'http://localhost:8080/4TheMusic/track';
  private searchUrl = 'http://localhost:8080/4TheMusic/track/search';
  private likeUrl = 'http://localhost:8080/4TheMusic/like';
  private dislikeUrl = 'http://localhost:8080/4TheMusic/dislike';



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

  viewTracks(album:Album):Observable<Track[]>{
    return this.http.get<Track[]>(this.baseurl+'/byAlbum/'+album.id).pipe(
      retry(1),catchError(this.errorHandler));
  }

  likeTrack(track:Track):Observable<Track>{
    console.log(track);
    const userToken = localStorage.getItem('token ');
    console.log("userToken is set to" + userToken);
    if(userToken != null)
    {
      this.httpOptions.headers.append(
        'token', userToken);
    }
    return this.http.post<Track>(this.likeUrl+'/'+userToken,JSON.stringify(track),this.httpOptions).pipe(
        retry(1),catchError(this.errorHandler));
  }

  dislikeTrack(track:Track):Observable<Track>{
    const userToken = localStorage.getItem('token ');
    console.log("userToken is set to" + userToken);
    if(userToken != null)
    {
      this.httpOptions.headers.append(
        'token', userToken);
    }
    return this.http.post<Track>(this.dislikeUrl+'/'+userToken,JSON.stringify(track),this.httpOptions).pipe(
        retry(1),catchError(this.errorHandler));
  }

  ratioTrack(track_id:number):Observable<Ratio>
  {
    return this.http.get<Ratio>(this.baseurl+'/getRatio/'+track_id).pipe(
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
