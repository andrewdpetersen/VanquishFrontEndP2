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

  constructor(private formBuilder: FormBuilder, 
               private authService: AuthenticationService,
               private http:HttpClient, 
               private router: Router ) { 
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
 
  userRegister() {
    const val = this.registerForm.getRawValue();
    console.log(val)
    this.authService.userRegister(this.registerForm)
      .subscribe(res => {console.log(res), (error: any) => console.log(error)})

    //this.registerForm.reset();
  }
}
