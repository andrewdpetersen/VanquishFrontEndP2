import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  registerForm: FormGroup | any;
  // registerForm: FormGroup = this.formBuilder.group({
  //       firstname: '',
  //       lastname: '',
  //       city: '',
  //       state: '',
  //       username: '',
  //       password: '', 
  //       email: ''

  // })

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
    private http:HttpClient, private router: Router ) { 
      // this.authService = authService;
    }

  ngOnInit(): void {


    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      city: '',
      state: '',
      username: '',
      password: '', 
      email: ''
    })
  }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'}),
  };
  // onSubmit(): void {
  //   console.log(this.registerForm.getRawValue());
  //   this.http.post("http://localhost:8080/4TheMusic/register/basic", 
  //   this.registerForm.getRawValue(), {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'})
  //   }
  //     )
  //   .subscribe( res => {
    
  //     console.log(res),
  //     (error: any) => console.log(error)
  //   this.router.navigate(['/navbar'])
  //   }),
  //   this.registerForm.reset()
  // }
  // let token = Object.values(res).toString();
  // localStorage.setItem("Token", token);
 
  userRegister() {
    
const val = this.registerForm.getRawValue();
    console.log(val)
    this.authService.userRegister(val).subscribe( 
      res => { 
      console.log(res),
      (error: any) => console.log(error)
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
