import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-premium-nav-bar',
  templateUrl: './premium-nav-bar.component.html',
  styleUrls: ['./premium-nav-bar.component.css']
})
export class PremiumNavBarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  LoggedOut () {
    this.authService.loggedOut();
    console.log("clicked")
    
  }

}
