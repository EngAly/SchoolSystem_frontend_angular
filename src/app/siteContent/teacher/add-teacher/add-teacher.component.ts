import { Component, OnInit, ViewChild } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import { ClassesComponent } from 'src/app/layout/classes/classes.component';
import { SubjectsComponent } from 'src/app/layout/subjects/subjects.component';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements EndPointAbstracts {

  teacher = new Teacher();
  inPrograss: boolean = false;
  @ViewChild(ClassesComponent) classesChild: any;
  @ViewChild(SubjectsComponent) subjectsChild: any;

  formData = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    // email:new FormControl('',[Validators.required,Validators.email]),
    email: new FormControl('', [Validators.required]),
    maritalStatus: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    doh: new FormControl('', Validators.required),
    graduateDate: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
    // specialization:new FormControl('',Validators.required),
    ssn: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    notes: new FormControl('', []),
    address: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    ex: new FormControl('', Validators.required)
  })

  constructor(private service: TeacherService) { }

  get controls() {
    return this.formData.controls;
  }

  //  get selected level objects from child
  getLevels() {
    this.teacher.levels = this.classesChild.getSelectedItems();
  }

  //  get selected subject object from child
  getSubjects() {
    this.teacher.subject = this.subjectsChild.getSelectedItems()[0]['name'];
  }

  save() {
    this.inPrograss = true;
    this.getLevels()
    this.getSubjects()

    this.teacher.gender = this.controls.gender.value;
    this.teacher.maritalStatus = this.controls.maritalStatus.value;
    // alert(JSON.stringify(this.teacher))
    this.service.add(this.teacher).then(
      saved => {
        if (saved) {
          alert(document.getElementById('savedMsg').textContent);
          this.reset();
        } else {
          alert(document.getElementById('unsavedMsg').textContent)
        }
        this.inPrograss = false;
      });
    // console.log(this.teacher)
  }

  // reset all form controls
  private reset() {
    this.formData.reset();
  }
}
        // $(document).ready(() => {
        //   $('.messagesuccess').css({ 'font-size': '150%' }).fadeIn(1500).fadeOut(2000)
        //$('.messagesuccess').fadeIn(3000)
        //   $('.message').fadeIn('fast')
        // }, 1000) 