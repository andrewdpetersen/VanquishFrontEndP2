import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TestCompComponent } from './components/test-comp/test-comp.component';
import { ConcertService } from './services/concert.service';
import { LocationService } from './services/location.service';
import { GenreServiceService } from './services/genre-service.service';
import { AuthenticationService } from './services/authentication.service';
import { TrackSearchComponent } from './components/track-search/track-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConcertComponent } from './components/concert/concert.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'navbar', component: NavbarComponent},
  
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    TestCompComponent,
    TrackSearchComponent,
    ConcertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule
  ],
  providers: [GenreServiceService,
    ConcertService,
    LocationService,
    AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }