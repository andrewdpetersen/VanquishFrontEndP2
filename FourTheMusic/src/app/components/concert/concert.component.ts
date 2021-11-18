import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/interfaces/concert';
import { ConcertService } from 'src/app/services/concert.service';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css']
})
export class ConcertComponent implements OnInit {
  name:String='';
  date:String='';
  city:String='';
  state:String='';
  newConcert:Concert[]=[];
  cancelledConcert:Concert[]=[];
  concert_id:number=0;

  constructor(private service:ConcertService) { }

  scheduleConcert(name:String,date:String,city:String,state:String):void{
    let concert = {
      concert_id:1,
      date:date,
      name:name,
      location:
      {
          location_id:1,
          city:city,
          state:state
      }
  }
    this.service.PostConcert(concert).subscribe(data=>{
      let {concert_id,date,name,location} = data;
      this.newConcert.push({concert_id,date,name,location});
  });}

  cancelConcert(concert_id:number):void{
    alert("This concert has been cancelled");
    this.service.DeleteConcert(concert_id).subscribe(data=>{
      let {concert_id,date,name,location} = data;
      this.cancelledConcert.push({concert_id,date,name,location});
  });}

  ngOnInit(): void {
  }

}
