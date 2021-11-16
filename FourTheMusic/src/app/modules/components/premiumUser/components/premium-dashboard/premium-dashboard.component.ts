import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-premium-dashboard',
  templateUrl: './premium-dashboard.component.html',
  styleUrls: ['./premium-dashboard.component.css']
})
export class PremiumDashboardComponent implements OnInit {
 

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  LoggedOut () {
    this.authService.loggedOut();
    console.log("clicked")

  }

}