import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { CacheObjectService } from 'src/app/services/cache-object.service';

@Component({
   selector: 'student-by-name',
   templateUrl: './student-by-name.component.html',
   styleUrls: ['./student-by-name.component.scss']
})
export class StudentByNameComponent {

   // search field
   name: string;

   inPrograss: boolean;

   // pages options
   currentPage: number;


   searchData = new FormGroup({
      name: new FormControl('', [Validators.required])
   });

   constructor(private service: StudentService, private _cache: CacheObjectService) {
      // clear all cached data in table when switch from component to other
      this._cache.setObject$=null;
   }

   get controls() {
      return this.searchData.controls;
   }

   searchByName() {
      this.inPrograss = true;
      this.service.getByName(this.name).subscribe(
         data => {
            // console.log(data['content']);
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
      // if (this.name.length == 0) {
      //    this.items = null;
      // }
   }



   // First() {
   //   this.currentPage = 0;
   //   this.onCurrentPageChange()
   // }

   // Previous() {
   //   this.currentPage > 0 ? this.currentPage-- : this.currentPage
   //   this.onCurrentPageChange()
   // }

   // Next() {
   //   // this.currentPage < this.totalPages - 1 ? this.currentPage++ : this.currentPage
   //   if (this.currentPage < this.totalPages - 1) {
   //     this.currentPage++
   //     this.onCurrentPageChange()
   //   }


   // }

   // Last() {
   //   this.currentPage = this.totalPages - 1;
   //   this.onCurrentPageChange()
   // }

}