
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  Success: boolean = false
  SignupFailed: boolean = false
  errorMessage: string = ''

  registerForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthenticationService, 
    private router: Router) {  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstName: '', 
      lastName: '', 
      city: '', 
      state: '', 
      username: '',
      password: '', 
      email: '', 
    })

  }

  

  userRegister() {
const val = this.registerForm.getRawValue();
    console.log(val)
    this.authService.userRegister(val).subscribe( 
      res => { 
        this.Success = true;
        this.SignupFailed = false;
      //  console.log(res),
      //   console.log(Object.values(res)),
      // (error: any) => console.log(error)
    
      this.router.navigate(['/navbarBasic'])
    })
    this.registerForm.reset();
  
  }
}

//if user registers (basic) navigate to home screen
//username and password must meet validation requirements
//Username must be atleast 5 - 20 characters,
//(atleast 1 uppercase, 1 number)
//password must be between 5 -20 characters
//email must have @ symbol
//boolean?
