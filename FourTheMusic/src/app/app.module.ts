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
import { PremiumNavBarComponent } from './premium-nav-bar/premium-nav-bar.component';
import { ConcertService } from './services/concert.service';
import { LocationService } from './services/location.service';
import { GenreServiceService } from './services/genre-service.service';
import { AuthenticationService } from './services/authentication.service';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'navbarBasic', component: NavbarComponent},
  {path: 'navbarPremium', component: PremiumNavBarComponent},
  {path: 'test', component: TestCompComponent}
  
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    TestCompComponent,
    PremiumNavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GenreServiceService,
    ConcertService,
    LocationService,
    AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }