import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  // loginForm: FormGroup | any;
  loginForm: FormGroup = this.formBuilder.group({
    username: '',
    password: ''
  })

  constructor(private formBuilder: FormBuilder, 
    private http:HttpClient, 
    private router: Router,
    private authService : AuthenticationService){}

  ngOnInit(): void {
      // this.loginForm = this.formBuilder.group({
      //   username: "",
      //   password: ""
      // })

  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'}),
  };

  //withCredetials allows us to get the jwt, this.form.getRawValue() is the data and subscribe returns the reponse object
  onSubmit(): void {
    console.log(this.loginForm.getRawValue());
    this.http.post("http://localhost:8080/4TheMusic/login", this.loginForm.getRawValue(), 
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'})
    }
      )
    .subscribe( res => {
      console.log(res),
      (error: any) => console.log(error)
    this.router.navigate(['/navbar'])
    }),
    this.loginForm.reset()
  }

  //if username and password match navigate to 
  //designated screens, one for basic user and 
  //one for premium
   
//  userLogin() {
//    const val = this.loginForm.getRawValue();
//    console.log(val)
//     this.authService.userLogin(val).subscribe( 
//       res => {
//       console.log(res),
//       localStorage.setItem('token', res.token),
//       (error: any) => console.log(error)
//     })
//     this.loginForm.reset();
//     this.router.navigate(['./home'])
//   }
}
