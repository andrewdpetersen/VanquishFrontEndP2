import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup | any;
  // loginForm: FormGroup = this.formBuilder.group({
  //   username: '',
  //   password: ''
  // })

  constructor(private formBuilder: FormBuilder, 
    private http:HttpClient, 
    private router: Router,
    private authService : AuthenticationService){}

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        username: "",
        password: ""
      })

  }

  //withCredetials allows us to get the jwt, this.form.getRawValue() is the data and subscribe returns the reponse object
  // onSubmit(): void {
  //   console.log(this.loginForm.getRawValue());
  //   this.http.post("http://localhost:8080/4TheMusic/login", this.loginForm.getRawValue(), {
  //     withCredentials: true})
  //   .subscribe( res => {
  //     console.log(res),
  //     (error: any) => console.log(error)
  //   this.router.navigate(['/navbar'])
  //   }),
  //   this.loginForm.reset()
  // }
   
 userLogin() {
   console.log(this.loginForm.getRawValue())
    this.authService.userLogin(this.loginForm).subscribe( 
      res => {
      console.log(res),
      localStorage.setItem('token', res.token),
      (error: any) => console.log(error)
    })
    this.loginForm.reset();
    this.router.navigate(['./home'])
  }
}
