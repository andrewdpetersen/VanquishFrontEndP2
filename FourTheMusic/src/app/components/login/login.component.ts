
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
        username: '', 
        password: '', 
      })
  }

  //if username and password match navigate to 
  //designated screens, one for basic user and 
  //one for premium

    /**
   * @author Erika Johnson
   * userLogin calls the authService's userLogin function to
   * validate that username and password match. Users are
   * redirected to the designated view.
   */
   
     userLogin() {
      const val = this.loginForm.getRawValue();
      console.log(val);
      this.authService.userLogin(val).subscribe((res) => {
        console.log(res),(error: any) => console.log(error);
        if (val.username === 'petean05' && val.password === 'secretPass33!') {
          alert('You are a premium user ' + val.username);
          this.router.navigate(['premiumUser']);
        } else if (val.username != 'petean05' && val.password != 'secretPass33!') {
          alert('Welcome back ' + val.username);
          this.router.navigate(['navbar']);
        } else {
          alert(
            'You are not a premium user, but hopefully you will be in the future'
          );
          this.router.navigate(['login']);
        }
      }),
        this.loginForm.reset();
    }
  }