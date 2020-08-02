import { Component, OnInit } from '@angular/core';
import { Guardian } from 'src/app/models/Guardian';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'guardian',
  templateUrl: './add-guardian.component.html',
  styleUrls: ['./add-guardian.component.scss']
})
export class AddGuardianComponent {

  guardian = new Guardian();

  formData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    ssn: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    // email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    email: new FormControl('', [Validators.required]),
    notes: new FormControl('', [])
  });


  constructor() { }

  get controls() {
    return this.formData.controls;
  }

  handleGenderChange(event: any) {
    this.guardian.gender = this.controls.gender.value;
  }

  /**
   * pass current object that carry all data to caller object
   */
  getCurrentObject(): Guardian {
    return this.guardian;
  }

  isValid(): boolean {
    return this.formData.valid;
  }

}
