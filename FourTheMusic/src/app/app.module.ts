import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { PremiumNavBarComponent } from './premium-nav-bar/premium-nav-bar.component';

import { TestCompComponent } from './components/test-comp/test-comp.component';
import { ConcertService } from './services/concert.service';
import { LocationService } from './services/location.service';
import { GenreServiceService } from './services/genre-service.service';
import { AuthenticationService } from './services/authentication.service';
import { TrackSearchComponent } from './components/track-search/track-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConcertComponent } from './components/concert/concert.component';
import { PlaylistManagerComponent } from './components/playlist-manager/playlist-manager.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'navbarBasic', component: NavbarComponent},
  {path: 'navbarPremium', component: PremiumNavBarComponent}
  
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,

    PremiumNavBarComponent,

    TestCompComponent,
    TrackSearchComponent,
    ConcertComponent,
    PlaylistManagerComponent

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


  //the token HTTP_INTERCEPTORS to use the classes (useClass) AuthInterceptor. In order to get this working, we need to specify multi: true so Angular knows that multiple values (or classes) are going to be used.

  providers: [GenreServiceService,
    ConcertService,
    LocationService,
    AuthenticationService],

  bootstrap: [AppComponent]
})
export class AppModule { }