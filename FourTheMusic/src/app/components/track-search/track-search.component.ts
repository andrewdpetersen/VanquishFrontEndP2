import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/interfaces/artist';
import { Track } from 'src/app/interfaces/track';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { TrackService } from 'src/app/services/track.service';
import { RatingService } from 'src/app/services/rating.service';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons';

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
  ratedTrack:Track[]=[];
  albumTracks:Track[]=[];
  ratio:String='';
  faThumbsUp=faThumbsUp;
  faThumbsDown=faThumbsDown;

  constructor(private service:TrackService,
    private service2:ArtistService,
    private service3:AlbumService,
    private service4:RatingService) { }

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
          let {id, album_title, date, genre, artist} = album;
          this.albumListResults.push({id, album_title, date, genre, artist});
          console.log(album);
    }
  })
}
  }

  /**
   * @author Michael Reece
   * @returns
   * calls to the function ratioTrack and subscribes to the observable that's returned from the Get method and sets ratio = to the result for displaying
   */
  ratioThis(track_id:number):void{
    this.service.ratioTrack(track_id).subscribe(data=>{
        let ratio = data;
        console.log(ratio);
    });
  }

  /**
   * @author Michael Reece
   * @returns
   * calls to the function likeTrack and subscribes to the observable that's returned from the post method and sets ratedTrack = to the result
   * sends in track to be liked
   */
  likeThis(track:Track):void{
    this.service.likeTrack(track).subscribe(data=>{
        let {track_id, title, artist, album} = data;
        this.ratedTrack.push({track_id, title, artist, album});
        console.log(this.ratedTrack);
    });
  }

  /**
   * @author Michael Reece
   * @returns
   * calls to the function dislikeTrack and subscribes to the observable that's returned from the post method and sets ratedTrack = to the result
   * sends in track to be disliked
   */
  dislikeThis(track:Track):void{
    this.service.dislikeTrack(track).subscribe(data=>{
      let {track_id, title, artist, album} = data;
      this.ratedTrack.push({track_id, title, artist, album});
      console.log(this.ratedTrack);
  });
  }

  viewTracks(album:Album):void{
    this.service.viewTracks(album).subscribe(data=>{
      for(const single of data){
        let {track_id, title, artist, album} = single;
        this.albumTracks.push({track_id, title, artist, album})
        console.log(single);
      }
    });
  }
  ngOnInit(): void {
  }

}
