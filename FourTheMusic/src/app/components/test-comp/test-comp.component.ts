import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../../interfaces/genre';
import { GenreServiceService } from '../../services/genre-service.service';
import { Location } from '../../interfaces/location'
import { LocationService } from 'src/app/services/location.service';
import { ConcertService } from 'src/app/services/concert.service';
import { Concert } from 'src/app/interfaces/concert'
import { TrackService } from 'src/app/services/track.service';
import { Track } from 'src/app/interfaces/track';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {
  num:number=0;
  constructor(private service:GenreServiceService,
    private service2:LocationService,
    private service3:ConcertService,
    private service4:TrackService) { }

  
  run(num:number):Observable<Genre>{
    console.log("Running");
    return this.service.GetGenre(num);
  }

  postG():Observable<Genre>{
    let genre = {
      genre_id:4,
      genre_name:"GenreName",
      image_url:"urlString"
    }
    console.log("Posting");
    return this.service.PostGenre(genre);
  }

  displayGenre(genre:Observable<Genre>):void{
    genre.subscribe(data=>{
      console.log("id: "+data.genre_id);
      console.log("name: "+data.genre_name);
      console.log("url: "+data.image_url);
    });
  }

  runGenre():Observable<Genre>{
    return this.service.GetGenre(1);
  }

  runLocation():Observable<Location>{
    return this.service2.GetLocation(1);
  }

  runConcert():Observable<Concert>{
    return this.service3.GetConcert(1);
  }

  runTrack():Observable<Track>{
    return this.service4.GetTrack(1);
  }

  testAll(genre:Observable<Genre>,location:Observable<Location>,concert:Observable<Concert>,track:Observable<Track>):
  void{
    genre.subscribe(data=>{
      console.log("id: "+data.genre_id);
      console.log("name: "+data.genre_name);
      console.log("url: "+data.image_url);
    })
    location.subscribe(data2=>{
      console.log("location_id: "+data2.location_id);
      console.log("city: "+data2.city);
      console.log("state: "+data2.state);
    })
    concert.subscribe(data3=>{
      console.log("concert_id: "+data3.concert_id);
      console.log("date: "+data3.concert_date);
      console.log("name: "+data3.name);
      console.log("location_id: "+data3.location.location_id);
      console.log("city: "+data3.location.city);
      console.log("state: "+data3.location.state);
    })
    track.subscribe(data4=>{
      console.log("track_id: "+data4.track_id);
      console.log("title: "+data4.title);
    })
  }

  ngOnInit(): void {
  }

}

