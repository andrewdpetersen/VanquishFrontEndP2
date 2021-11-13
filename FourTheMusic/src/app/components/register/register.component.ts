import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      city: '',
      state: '',
      username: '',
      password: '',
      email: ''
    })
  }

  userRegister() {
    const val = this.registerForm.getRawValue();
    console.log(val)
    this.authService.userRegister(this.registerForm)
      .subscribe(res => {console.log(res), (error: any) => console.log(error)})

    //this.registerForm.reset();
  }
}
