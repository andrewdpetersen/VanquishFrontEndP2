import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from 'src/app/interfaces/track';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-track-search',
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.css']
})
export class TrackSearchComponent implements OnInit {
  title:String='';
  trackListResults: Track[]=[];

  constructor(private service:TrackService) { }

  searchTracks(title:String):Observable<Track[]>{
    return this.service.SearchTracks(title);
  }

  listTracks(title:String):void{
    this.service.SearchTracks(title).subscribe(data=>{
      for(const single of data){
        let {track_id, title, artist, album} = single;
        this.trackListResults.push({track_id, title, artist, album})
        console.log(single);
      }
    }
      )
  }

  ngOnInit(): void {
  }

}
