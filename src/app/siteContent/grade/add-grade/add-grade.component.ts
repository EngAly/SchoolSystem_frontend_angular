import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Grade } from 'src/app/models/Grade';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { ValidateMonth } from 'src/app/CustomValidators';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
   selector: 'app-add-grade',
   templateUrl: './add-grade.component.html',
   styleUrls: ['./add-grade.component.scss']
})
export class AddGradeComponent implements EndPointAbstracts, OnInit {

   grade = new Grade();
   student = new Student();
   hasData = false;
   inPrograss: boolean = false;

   formData = new FormGroup({
      year: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.required, ValidateMonth]),
      grade: new FormControl('', Validators.required),
   })

   constructor(private _cache: CacheObjectService, private service: StudentService) { }

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
      this.student.grades.push(this.grade);
      // stop until insert or fail
      this.inPrograss = true;
      this.service.add(this.student).then(
         saved => {
            if (saved) {
               alert(document.getElementById('savedMsg').textContent);
               this.reset();
            } else {
               alert(document.getElementById('unsavedMsg').textContent)
            }
            this.inPrograss = false;
         });
      // console.log(this.student)
   }

   private reset() {
      this.grade = { grade: this.grade.grade, month: null, year: null }
      // return form data to pristine state
      this.formData.reset();
   }

   /**
    * read primary template
    */
   primaryTable() {
      this.grade.grade = `
      <table align="center" border="1" cellpadding="1" cellspacing="1" class="table table-bordered table-hover table-striped" dir="ltr" style="width:500px">
	   <tbody>
		<tr>
			<td>subject</td>
			<td>&nbsp;grade</td>
		</tr>
		<tr>
			<td>1</td>
			<td>3</td>
		</tr>
		<tr>
			<td>2</td>
			<td>3</td>
		</tr>
	</tbody>
</table>
<p>&nbsp;</p>
      `
   }
}