import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'src/app/models/Subject';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent {
  subject = new Subject();

  subjectDataForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    desc: new FormControl('', [])
  });

  constructor() { }

  get subjectControls() {
    return this.subjectDataForm.controls;
  }

  save() {
    alert(JSON.stringify(this.subject));
  }

}
