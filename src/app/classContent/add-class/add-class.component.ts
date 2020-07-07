import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Season } from 'src/app/models/Season';
import { Operations } from 'src/app/interfaces/Operations';
import { SubjectsComponent } from 'src/app/subjectContent/subjects/subjects.component';
 
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements Operations {

  class = new Season();

  @ViewChild(SubjectsComponent) childSubject: any

  classDataForm = new FormGroup({
    name: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    maxSize: new FormControl('', Validators.required),
    currentSize: new FormControl('', Validators.required)
  })

  constructor() { }

  get controls() {
    return this.classDataForm.controls;
  }

  public handleSubjects() {
    this.class.subjects = this.childSubject.getSelectedItems();
  }

  save() {
    alert(JSON.stringify(this.class))
  }

}