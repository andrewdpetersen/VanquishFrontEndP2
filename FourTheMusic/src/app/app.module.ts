import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { httpInterceptorProviders} from './interceptor/index' 
import { AuthInterceptor } from './interceptor/auth.interceptor';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'navbar', component: NavbarComponent}
  
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],

  //the token HTTP_INTERCEPTORS to use the classes (useClass) AuthInterceptor. In order to get this working, we need to specify multi: true so Angular knows that multiple values (or classes) are going to be used.
  providers: [AuthenticationService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    httpInterceptorProviders,
],
  bootstrap: [AppComponent]
})
export class AppModule { }