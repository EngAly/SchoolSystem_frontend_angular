import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { CacheObjectService } from 'src/app/services/cache-object.service';

@Component({
  selector: 'app-student-search-level',
  templateUrl: './student-search-level.component.html',
  styleUrls: ['./student-search-level.component.scss']
})
export class StudentSearchLevelComponent  {

 // search field
 level: string;

 inPrograss: boolean;

 // pages options
 currentPage: number;


 searchData = new FormGroup({
    level: new FormControl('', [Validators.required])
 });

 constructor(private service: StudentService, private _cache: CacheObjectService) {
    // clear all cached data in table when switch from component to other
    this._cache.setObject$=null;
 }

 get controls() {
    return this.searchData.controls;
 }

 searchByLevel() {
    this.inPrograss = true;
    this.service.getByLevel(this.level).subscribe(
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