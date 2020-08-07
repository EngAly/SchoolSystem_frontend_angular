import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UserRegister } from 'src/app/models/Register';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements EndPointAbstracts {

  user = new UserRegister();

  formData = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [])
  });

  constructor() { }

  get controls() {
    return this.formData.controls;
  }

  handleGenderChange(event) {
    this.user.gender = this.formData.get('gender').value
  }

  clearPasswords() {
    this.user.password = "";
  }

  save() {
    delete this.user.confirmPassword;
    alert(JSON.stringify(this.user));
    this.clearPasswords();
  }



}
