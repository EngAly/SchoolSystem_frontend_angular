import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

   get controls() {
      return this.checkName.controls;
    }

   search() {

   }

   clearResults(){

   }

   pristine(){
      this.checkName.reset()
   }

}
