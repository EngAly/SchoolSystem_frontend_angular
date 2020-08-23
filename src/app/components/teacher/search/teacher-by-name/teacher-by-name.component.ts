import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-teacher-by-name',
   templateUrl: './teacher-by-name.component.html',
   styleUrls: ['./teacher-by-name.component.scss']
})
export class TeacherByNameComponent {
   name: string;
   inPrograss: boolean;

   // pages options
   currentPage: number;
   direction = "desc";
   sort: string;


   searchData = new FormGroup({
      name: new FormControl('', [Validators.required])
   });

   constructor(private _cache: CacheObjectService, private service: TeacherService, private route: Router) { }

   get controls() {
      return this.searchData.controls;
   }

   /**
    * search about teacher by name
    */
   searchByName() {
      this.inPrograss = true;
      this.service.getByName(this.name).subscribe(
         data => {
            // console.log(data)
            // trigger instantaneous update to all subscriber on other once it changed
            this._cache.setObject$ = data['content'];
            // this.currentPage = data['pageable']['pageNumber'];
            this.inPrograss = false;
         },
         error => {
            console.log(error)
         });
   }

   sortBy(sort: string) {
      // this.sort = sort;
      // if (this.items.length > 0) {
      //    this.direction = this.direction == 'desc' ? 'asc' : 'desc';
      //    this.service.getByName(this.name, this.currentPage, 8, sort, this.direction).subscribe(
      //       data => {
      //          this.items = data['content'];
      //       },
      //       error => {
      //          console.log(error)
      //       });
      // }
   }

   clearResults() {
      // if (this.name.length == 0) {
      //    this.items = null;
      // }
   }
}
