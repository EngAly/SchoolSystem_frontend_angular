import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
   selector: 'app-search-teacher',
   templateUrl: './search-teacher.component.html',
   styleUrls: ['./search-teacher.component.scss']
})
export class SearchTeacherComponent {

   name: string;
   items: Array<Teacher> = [];
   inPrograss: boolean;

   // pages options
   currentPage: number;
   direction = "desc";
   sort: string;


   checkName = new FormGroup({
      name: new FormControl('', [Validators.required])
   });

   constructor(private service: TeacherService) { }

   get controls() {
      return this.checkName.controls;
   }

   /**
    * search about teacher by name
    */
   searchByName() {
      this.inPrograss = true;
      this.service.getByName(this.name).subscribe(
         data => {
            // console.log(data)
            this.items = data['content'];
            this.currentPage = data['pageable']['pageNumber'];
            this.inPrograss = false;
         },
         error => {
            console.log(error)
         });
   }

   sortBy(sort: string) {
      this.sort = sort;
      if (this.items.length > 0) {
         this.direction = this.direction == 'desc' ? 'asc' : 'desc';
         this.service.getByName(this.name, this.currentPage, sort, this.direction).subscribe(
            data => {
               this.items = data['content'];
            },
            error => {
               console.log(error)
            });
      }
   }

   clearResults() {
      if (this.name.length == 0) {
         this.items = null;
      }
   }

   /**    In progressssssss
    * when click on any record in table will got to 
    * teacher details component and show all teacher details 
    * @param item 
    */
   getDetails(item: Teacher) {
      alert(JSON.stringify(item));

   }
}
