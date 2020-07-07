import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UserRegister } from 'src/app/models/Register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user = new UserRegister();

  registerDataForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [])
  });

  constructor() { }

  get registerControls() {
    return this.registerDataForm.controls;
  }

  handleGenderChange(event) {
    this.user.gender = this.registerDataForm.get('gender').value
  }

  clearPasswords() {
    this.user.password = "";
  }

  register() {
    delete this.user.confirmPassword;
    alert(JSON.stringify(this.user));
    this.clearPasswords();
  }



}
