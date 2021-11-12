import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist';
import { Track } from 'src/app/interfaces/track';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-track-search',
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.css']
})
export class TrackSearchComponent implements OnInit {
  search:String='';
  searchType:String='';
  trackListResults: Track[]=[];
  artistListResults: Artist[]=[];
  albumListResults: Album[]=[];

  constructor(private service:TrackService,
    private service2:ArtistService,
    private service3:AlbumService) { }

  searchTracks(search:String):Observable<Track[]>{
    return this.service.SearchTracks(search);
  }

  listSearch(search:String,searchType:String):void{
    if(searchType=='track'){
      this.service.SearchTracks(search).subscribe(data=>{
      for(const single of data){
        let {track_id, title, artist, album} = single;
        this.trackListResults.push({track_id, title, artist, album})
        console.log(single);
      }
    }
      )
    }else if(searchType=='artist'){
      this.service2.SearchArtists(search).subscribe(data=>{
        for(const artist of data){
          let {ID, name, image_url} = artist;
          this.artistListResults.push({ID, name, image_url});
          console.log(artist);
        }
      })
    }else if(searchType=='album'){
      this.service3.SearchAlbums(search).subscribe(data=>{
        for(const album of data){
          let {ID, albumTitle, date, artist, genre} = album;
          this.albumListResults.push({ID, albumTitle, date, artist, genre});
          console.log(album);
    }
  })
}
  }

  ngOnInit(): void {
  }

}
