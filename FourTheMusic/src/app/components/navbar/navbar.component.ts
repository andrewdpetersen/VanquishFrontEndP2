import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from 'src/app/services/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  constructor( private authService: AuthenticationService) { 

   }


  ngOnInit():void {


  }
 
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  LoggedOut () {
    this.authService.loggedOut();
    console.log("clicked")
  }
}

