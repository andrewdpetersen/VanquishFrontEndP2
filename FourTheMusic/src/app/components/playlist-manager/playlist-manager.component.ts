import { Component, OnInit } from '@angular/core';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Playlist, Track } from 'src/app/interfaces/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist-manager',
  templateUrl: './playlist-manager.component.html',
  styleUrls: ['./playlist-manager.component.css']
})
export class PlaylistManagerComponent implements OnInit {
  playlistName:String='';
  playlist_id:number=0;
  tracks:Track[]=[];
  newPlaylist:Playlist[]=[];
  faThumbsUp=faThumbsUp;
  faThumbsDown=faThumbsDown;

  constructor(private service:PlaylistService) { }

  createPlaylist(name:String):void{
    this.service.PostPlaylist({
      playlist_id:this.playlist_id,
      playlistName:this.playlistName,
      tracks:this.tracks
  }).subscribe(list=>{
      let {playlist_id,playlistName,tracks}=list;
      this.newPlaylist.push({playlist_id,playlistName,tracks})
      console.log(list);
  })
}

  viewPlaylist(playlist_id:number):void{
    this.service.GetPlaylist(playlist_id).subscribe(list=>{
      let {playlist_id,playlistName,tracks}=list;
      for(const track of this.tracks){
        let{track_id, title, artist, album} = track;
        this.tracks.push({track_id, title, artist, album});
        console.log(track);
      }
    });
  }

  ngOnInit(): void {
  }

}
