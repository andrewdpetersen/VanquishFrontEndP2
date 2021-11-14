
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup | any;



  constructor(private formBuilder: FormBuilder,  
    private router: Router,
    private authService : AuthenticationService){
    }

  ngOnInit(): void {

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required], 
      })
  }

  //if username and password match navigate to 
  //designated screens, one for basic user and 
  //one for premium
   
 userLogin() {
   const val = this.loginForm.getRawValue();
   console.log(val)
    this.authService.userLogin(val).subscribe( 
      res => {
      console.log(res),
      alert('Welcome back ' + val.username),
      (error: any) => console.log(error)
    })
    const user = this.authService.userLogin(val.values)
    if(user){
      console.log('Success')
    } else {
      console.log('UnSuccessful')
    }
    this.loginForm.reset();
    this.router.navigate(['./navbarBasic'])
  }
}


