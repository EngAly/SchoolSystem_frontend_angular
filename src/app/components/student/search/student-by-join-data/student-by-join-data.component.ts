import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { JoinDate } from 'src/app/models/Search';
import { DatePipe } from '@angular/common';

@Component({
   selector: 'student-by-join-data',
   templateUrl: './student-by-join-data.component.html',
   styleUrls: ['./student-by-join-data.component.scss']
})
export class StudentByJoinDataComponent {

   joinDate = new JoinDate();
   inPrograss: boolean;

   searchData = new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required])
   });

   constructor(private service: StudentService, private _cache: CacheObjectService, private datePipe: DatePipe) { 
      // clear all cached data in table when switch from component to other
      this._cache.setObject$=null;
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