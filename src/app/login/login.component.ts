import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../product';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }



  users?: User[];
  hide = true;
  loginBoxFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activatedrout: ActivatedRoute,
    public router: Router,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginBoxFormGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  // email = new FormControl('', [Validators.required, Validators.email]);
  // password= new FormControl('',[Validators.required,Validators.minLength(6)]);

  getEmailErrorMessage() {
    if (this.loginBoxFormGroup.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginBoxFormGroup.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.loginBoxFormGroup.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginBoxFormGroup.get('password')?.hasError('minlength') ? 'Password contains atleast 6 Characters' : '';
  }

  login(): void {
    if (this.loginBoxFormGroup?.value) {
      const email = this.loginBoxFormGroup.get('email');
      const password = this.loginBoxFormGroup.get('password');
      if (email && password) {
        this.loginService.updateLoginUser(email.value, password.value);
      }
      //  this.router.navigate(['/home',email?.value]);
    }
  }

  // signup(): void {
  //   this.router.navigate(['home']);
  // }
}






