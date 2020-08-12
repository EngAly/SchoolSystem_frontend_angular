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
export class StudentDetailsComponent implements OnInit, OnDestroy {

   student = new Student();
   grade = new Grade();

   // flag to use if there data
   hasData = false;

   /**
    * inject all services that component dependant about it
    * @param service 
    * @param _cache 
    * @param activeRoute 
    * @param route 
    */
   constructor(private service: StudentService, private _cache: CacheObjectService, private activeRoute: ActivatedRoute, private route: Router) {
   }

   /**
    * init grade object with ready value to be fast for user to INC And DEC 
    * grap paramter from route snapshot (url)
    * test if cache service has data then handle data from cache service
    * if no cache data from id in url get student by id if id not found
    * get message student not found
    */
   ngOnInit(): void {
      this.grade = { year: 2010, month: 6, grade: this.grade.grade }
      let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
      if (Object.keys(this._cache.getObject).length > 0) {
         this.student = this._cache.getObject;
         this.hasData = true;
      } else {
         if (id) {
            this.getById(id);
         }
      }
   }

   /**
    * get student from server side by its id
    * @param id 
    */
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
    * cache student object to cache service to handle it in add grade component
    * go to another gui with cached student data and add grade to it
    */
   setGrade() {
      this._cache.setObject = this.student;
      this.route.navigate(['student/grade/', this.student.id])
      // this.route.navigate([this.student.id], { relativeTo: this.activeRoute })
   }

   /**
    * search about grade by year and month and 
    * inject it to selected it in dom
    */
   getGradeByYearAndMonth() {
      this.student.grades.filter(
         // item refer to grade
         item => {
            if (item.year == this.grade.year && item.month == this.grade.month) {
               this.grade.grade = item.grade
               // append table grade to select id place it best than [innerHtml] property in <div>
               document.getElementById('grade_id').innerHTML = this.grade.grade;
            }
         }
      )
   }


   update() {
      //  cache object 
      // this._cache.setObject = this.student;
   }

   deleteById() {

   }

   ngOnDestroy(): void {
      //   this._cache.setObject = null
   }
}
