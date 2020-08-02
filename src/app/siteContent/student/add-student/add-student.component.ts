import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { IControllerMethods } from 'src/app/interfaces/IControllerMethods';
import { Student } from 'src/app/models/Student';
import { StudentStatusComponent } from 'src/app/layout/student-status/student-status.component';
import { ClassesComponent } from 'src/app/layout/classes/classes.component';
import { AddGuardianComponent } from '../../guardian/add-guardian/add-guardian.component';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements IControllerMethods {


  student: Student = new Student();
  inPrograss: boolean = false;
  isGuardianValid: boolean = false;

  @ViewChild(StudentStatusComponent) statusChild: any;
  @ViewChild(ClassesComponent) classesChild: any;
  @ViewChild(AddGuardianComponent) guardianChild: any;

  formData = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    // init or default
    // gender: new FormControl('Male', Validators.required),
    gender: new FormControl('', Validators.required),
    // email: new FormControl('', [Validators.required, Validators.email]),
    email: new FormControl('', []),
    dob: new FormControl('', Validators.required),
    joinDate: new FormControl('', Validators.required),
    paidFees: new FormControl('', Validators.required),
    remainFees: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  constructor(private service: StudentService) { }

  get controls() {
    return this.formData.controls;
  }

  handleGenderChange(event: any) {
    // alert(this.controls.gender.value)
    this.student.gender = this.controls.gender.value;
  }

  setStatus() {
    this.student.status = this.statusChild.getSelected();
  }

  setLevel() {
    this.student.level = this.classesChild.getSelected();
  }

  setGuardian() {
    this.student.guardian = this.guardianChild.getCurrentObject();
  }

  handleValidation(event) {
    this.isGuardianValid = this.guardianChild.isValid();
  }

  getCurrentObject() {
    this.setStatus();
    this.setLevel();
    this.setGuardian();
  }

  save() {
    this.getCurrentObject();
    // alert(JSON.stringify(this.student));
    this.inPrograss = true;
    this.service.add(this.student).then(
      saved => {
        if (saved) {
          alert(document.getElementById('savedMsg').textContent);
          // this.reset();
        } else {
          alert(document.getElementById('unsavedMsg').textContent)
        }
        this.inPrograss = false;
      }
    );
    console.log(this.student)
  }
}
