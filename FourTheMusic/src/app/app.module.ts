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

import { TestCompComponent } from './components/test-comp/test-comp.component';
import { ConcertService } from './services/concert.service';
import { LocationService } from './services/location.service';
import { GenreServiceService } from './services/genre-service.service';
import { TrackSearchComponent } from './components/track-search/track-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConcertComponent } from './components/concert/concert.component';
import { PlaylistManagerComponent } from './components/playlist-manager/playlist-manager.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { PremiumDashboardComponent } from './modules/components/premiumUser/components/premium-dashboard/premium-dashboard.component';




const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'navbar', component: NavbarComponent,
    children: [
      {path: 'playlistManager', component:PlaylistManagerComponent},
      {path: 'trackSearch', component:TrackSearchComponent},
    ] 
},
{path: 'premiumUser', 
canActivate: [AuthGuard],
loadChildren: () => 
import('../app/modules/premium-user/premium-user.module').then((m) => m.PremiumUserModule),
},
 
{path: '', redirectTo: '/login', pathMatch: 'full'}

]
   
// },
// {path: '', redirectTo: '/login', pathMatch: 'full'}
//   // {path: '**', component: NavbarComponent},//not found page
//   // {path: '', redirectTo: '/login', pathMatch: 'full'},
// ]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,

    TestCompComponent,
    TrackSearchComponent,
    ConcertComponent,
    PlaylistManagerComponent,
    PremiumDashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
  ],


  //the token HTTP_INTERCEPTORS to use the classes (useClass) AuthInterceptor. In order to get this working, we need to specify multi: true so Angular knows that multiple values (or classes) are going to be used.

  providers: [GenreServiceService,
    ConcertService,
    LocationService,
    AuthenticationService],

  bootstrap: [AppComponent]
})
export class AppModule { }