import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private baseurl = 'http://localhost:8080/4TheMusic/album';
  private searchUrl = 'http://localhost:8080/4TheMusic/album/search';

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
  };

  SearchAlbums(title:String):Observable<Album[]>{
    return this.http.get<Album[]>(this.searchUrl+'/'+title).pipe(
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
