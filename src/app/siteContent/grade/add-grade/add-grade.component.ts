import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Grade } from 'src/app/models/Grade';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { ValidateMonth } from 'src/app/CustomValidators';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { Student } from 'src/app/models/Student';

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.scss']
})
export class AddGradeComponent implements EndPointAbstracts, OnInit {

  grade = new Grade();
  student = new Student();
  hasData = true;

  formData = new FormGroup({
    year: new FormControl('', [Validators.required]),
    month: new FormControl('', [Validators.required, ValidateMonth]),
    degree: new FormControl('', Validators.required),
  })

  constructor(private _cache: CacheObjectService) { }

  ngOnInit() {
    if (Object.keys(this._cache.getObject).length > 0) {
      this.student = this._cache.getObject
      this.hasData = true;
    }
  }

  get controls() {
    return this.formData.controls;
  }

  save() {
    alert(JSON.stringify(this.student));
    alert(JSON.stringify(this.grade))
  }

}