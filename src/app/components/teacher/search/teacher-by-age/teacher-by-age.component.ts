import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Age } from 'src/app/models/Search';
import { CacheObjectService } from 'src/app/services/cache-object.service';

@Component({
  selector: 'app-teacher-by-age',
  templateUrl: './teacher-by-age.component.html',
  styleUrls: ['./teacher-by-age.component.scss']
})
export class TeacherByAgeComponent  {

   age = new Age();
   inPrograss: boolean;

   searchData = new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required])
   });

   constructor(private service: TeacherService, private _cache: CacheObjectService) {
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