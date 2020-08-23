import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JoinDate } from 'src/app/models/Search';
import { TeacherService } from 'src/app/services/teacher.service';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { DatePipe } from '@angular/common';

@Component({
   selector: 'app-teacher-by-join-date',
   templateUrl: './teacher-by-join-date.component.html',
   styleUrls: ['./teacher-by-join-date.component.scss']
})
export class TeacherByJoinDateComponent {

   joinDate = new JoinDate();
   inPrograss: boolean;

   searchData = new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required])
   });

   constructor(private service: TeacherService, private _cache: CacheObjectService, private datePipe: DatePipe) {
      // clear all cached data in table when switch from component to other
      this._cache.setObject$ = null;
   }

   get controls() {
      return this.searchData.controls;
   }

   searchByJoinDate() {
      this.inPrograss = true;
      this.service.getByJoinDate(this.datePipe.transform(this.joinDate.start, "dd-MM-yyyy"),
         this.datePipe.transform(this.joinDate.end, "dd-MM-yyyy")).subscribe(
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
      if (Object.keys(this.joinDate).length == 0) {
         this.joinDate = null;
      }
   }
}