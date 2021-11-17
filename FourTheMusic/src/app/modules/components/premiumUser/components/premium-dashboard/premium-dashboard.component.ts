import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-premium-dashboard',
  templateUrl: './premium-dashboard.component.html',
  styleUrls: ['./premium-dashboard.component.css']
})
export class PremiumDashboardComponent implements OnInit {
 

  navbarOpen = false;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  LoggedOut () {
    this.authService.loggedOut();
    console.log("clicked")
    
  }

}