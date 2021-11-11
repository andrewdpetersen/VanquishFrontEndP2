import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../genre';
import { GenreServiceService } from '../genre-service.service';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {
  num:number=0;
  constructor(private service:GenreServiceService) { }

  
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

  display(genre:Observable<Genre>):void{
    genre.subscribe(data=>{
      console.log("id: "+data.genre_id);
      console.log("name: "+data.genre_name);
      console.log("url: "+data.image_url);
    });
  }

  ngOnInit(): void {
  }

}

