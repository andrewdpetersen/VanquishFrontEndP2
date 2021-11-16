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

  /**
   * @author Michael Reece
   * @returns
   * sends a get request to our back end with the track id of a specific track and returns an observable object with a string that contains the ratio as a string
   */
  ratioTrack(track_id:number):Observable<string>
  {
    return this.http.get<string>(this.baseurl+'/getRatio/'+track_id).pipe(
      retry(1),catchError(this.errorHandler));
  }

  /**
   * @author Michael Reece
   * @returns
   * sends a post request with the user token (if the token isn't null) in the header and a track as a parameter
   * adds the track to the logged in user's likes list, and the user to the track's "users who like this track" list
   */
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

  /**
   * @author Michael Reece
   * @returns
   * sends a post request with the user token (if the token isn't null) in the header and a track as a parameter
   * adds the track to the logged in user's dislikes list, and the user to the track's "users who dislike this track" list
   */
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
