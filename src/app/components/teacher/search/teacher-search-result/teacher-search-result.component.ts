import { Component, OnInit } from '@angular/core';
 import { CacheObjectService } from 'src/app/services/cache-object.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/models/Teacher';
 
@Component({
  selector: 'app-teacher-search-result',
  templateUrl: './teacher-search-result.component.html',
  styleUrls: ['./teacher-search-result.component.scss']
})
export class TeacherSearchResultComponent {

   name: string;
   items: Array<Teacher> = [];
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
   constructor(private service: TeacherService, private _cache: CacheObjectService, private route: Router, private activeRoute: ActivatedRoute) {
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

   getDetails(item: Teacher) {
      this._cache.setObject = item;
      this.route.navigate(['teacher/details/', item.id])
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