import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Grade } from 'src/app/models/Grade';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { CustomValidators } from 'src/app/validators/CustomValidators';

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
      month: new FormControl('', [Validators.required, CustomValidators.ValidateMonth]),
      grade: new FormControl('', Validators.required),
   })

   constructor(private _cache: CacheObjectService, private service: StudentService) {
      this.grade = { grade: this.primaryTable(), month: 6, year: 2010 }
   }

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
      // sure that grades not has any previous objects
      this.student.grades = [];
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
      // return form data to pristine state
      // this.formData.reset();
   }

   /**
    * ready table template
    */
   primaryTable() {
      return this.grade.grade = `
      <table align="center" border="1" cellpadding="1" cellspacing="1" class="table table-bordered table-hover table-striped" dir="rtl" style="width:300px">
	<thead>
		<tr>
			<th scope="col"><span style="font-size:18px">الماده</span></th>
			<th scope="col"><span style="font-size:18px">الدرجه</span></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="text-align:center"><span style="font-size:14px">عربي</span></td>
			<td style="text-align:center">&nbsp;</td>
		</tr>
		<tr>
			<td style="text-align:center"><span style="font-size:14px">لغه إنجليزيه</span></td>
			<td style="text-align:center">&nbsp;</td>
		</tr>
		<tr>
			<td style="text-align:center"><span style="font-size:14px">رياضيات</span></td>
			<td style="text-align:center">&nbsp;</td>
		</tr>
		<tr>
			<td style="text-align:center"><span style="font-size:14px">علوم</span></td>
			<td style="text-align:center">&nbsp;</td>
		</tr>
		<tr>
			<td style="text-align:center"><span style="font-size:14px">كيمياء</span></td>
			<td style="text-align:center">&nbsp;</td>
		</tr>
		<tr>
			<td style="text-align:center"><span style="font-size:14px">فيزياء</span></td>
			<td style="text-align:center">&nbsp;</td>
		</tr>
		<tr>
			<td style="text-align:center"><span style="font-size:14px">تاريخ</span></td>
			<td style="text-align:center">&nbsp;</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>

      `
   }
}