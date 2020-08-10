import { Component, OnInit, OnDestroy } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { StudentService } from 'src/app/services/student.service';
import { Grade } from 'src/app/models/Grade';

@Component({
   selector: 'student-details',
   templateUrl: './student-details.component.html',
   styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnDestroy {


   student = new Student();
   grade = new Grade();

   // test if there data
   hasData = false;

   constructor(private service: StudentService, private _cache: CacheObjectService, private activeRoute: ActivatedRoute, private route: Router) {
      // grap paramter from route snapshot (url)
      let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
      //  grab data from cache  service
      if (Object.keys(this._cache.getObject).length > 0) {
         this.student = this._cache.getObject;
         this.hasData = true;
      } else {
         if (id) {
            this.getById(id);
         }
      }
   }

   getById(id: number) {
      this.service.findById(id).subscribe(
         data => {
            this.student = data;
            this.hasData = this.student.name.length > 0 ? true : false;
         }, error => {
            console.log(error)
         }
      )
   }

   /**
    * cache object 
    */
   persistObject() {
      this._cache.setObject = this.student;
   }

   /**
    * add new grade to student 
    * go to another gui with saved student data and add grade to it
    */
   setGrade() {
      this._cache.setObject = this.student;
      this.route.navigate(['student/grade/', this.student.id])
      // this.route.navigate([this.student.id], { relativeTo: this.activeRoute })
   }

   ngOnDestroy(): void {
      //   this._cache.setObject = null
   }

   /**
    * search about grade by year and month
    */
   getGradeByYearAndMonth() {
      this.student.grades.filter(
         // item refer to grade
         item => {
            if (item.year == this.grade.year && item.month == this.grade.month) {
               // alert(JSON.stringify(item.grade));
               this.grade.grade = item.grade
            }
         }
      )
   }

   /**
    * not implememt
    */
   deletestudentById(){

   }
}
