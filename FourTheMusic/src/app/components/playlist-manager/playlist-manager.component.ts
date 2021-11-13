import { Component, OnInit } from '@angular/core';
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



  ngOnInit(): void {
  }

}
