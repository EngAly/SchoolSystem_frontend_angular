import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { StudentService } from 'src/app/services/student.service';
import { Age } from 'src/app/models/Search';

@Component({
   selector: 'student-by-age',
   templateUrl: './student-by-age.component.html',
   styleUrls: ['./student-by-age.component.scss']
})
export class StudentByAgeComponent {

   age = new Age();
   inPrograss: boolean;

   searchData = new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required])
   });

   constructor(private service: StudentService, private _cache: CacheObjectService) {
      // clear all cached data in table when switch from component to other
      this._cache.setObject$=null;
   }

   get controls() {
      return this.searchData.controls;
   }

   searchByyAge() {
      this.inPrograss = true;
      this.service.getByAge(this.age.start, this.age.end).subscribe(
         data => {
            this._cache.setObject$ = data['content'];
            // this.currentPage = data['pageable']['pageNumber'];
            this.inPrograss = false;
         },
         error => {
            this.inPrograss = false;
            console.log(error)
         });
   }

   public clearResults() {
      if (Object.keys(this.age).length == 0) {
         this.age = null;
      }
   }
}