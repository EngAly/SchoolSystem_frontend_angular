import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
   selector: 'app-student-search-result',
   templateUrl: './student-search-result.component.html',
   styleUrls: ['./student-search-result.component.scss']
})
export class StudentSearchResultComponent {
   name: string;
   items: Array<Student> = [];
   inPrograss: boolean;

   // pages options
   currentPage: number;
   direction = "desc";
   sort: string;

   /**
    * when there any changes in setObject$ method in cache that 
    * return observable so that will notify all subscriber with 
    * new changes automatically.
    */
   constructor(private service: StudentService, private _cache: CacheObjectService, private route: Router, private activeRoute: ActivatedRoute) {
       this._cache.getObject$.subscribe(
         data => {
            // console.log(data);
            this.items = data;
         }, error => {
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

   getDetails(item: Student) {
      this._cache.setObject = item;
      this.route.navigate(['student/details/', item.id])
      // this.route.navigate([item.id], { relativeTo: this.activeRoute })
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