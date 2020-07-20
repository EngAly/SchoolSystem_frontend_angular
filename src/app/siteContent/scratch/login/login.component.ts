import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserLogin } from 'src/app/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user = new UserLogin();

  loginDataForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor() { }

  get loginControls() {
    return this.loginDataForm.controls;
  }

  login() {
    alert(JSON.stringify(this.user));
  }

}
