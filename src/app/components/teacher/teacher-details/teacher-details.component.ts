import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
   selector: 'app-teacher-details',
   templateUrl: './teacher-details.component.html',
   styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {

   teacher = new Teacher();
   id: any
   // flag to use if there data
   hasData: boolean;

   constructor(private service: TeacherService, private _cache: CacheObjectService,
      private activeRoute: ActivatedRoute, private route: Router) { }

   ngOnInit(): void {
      this.id = this.activeRoute.snapshot.paramMap.get('id');
      // if url has id so dataflow intented to update statue
      if (this.id) {
         if (Object.keys(this._cache.getObject).length > 0) {
            this.teacher = this._cache.getObject;
            this.hasData = true;
         } else
            parseInt(this.id) ? this.getById(this.id) : this.hasData = false;
      }
   }

   /**
     * get student from server side by its id
     * @param id: provide id to get object by it
     */
   getById(id: number) {
      this.service.getById(id).subscribe(
         data => {
            this.teacher = data;
            this.hasData = true;
         }, error => {
            this.hasData = false;
            console.log(error)
         }
      )
   }

   update() {
      this._cache.setObject = this.teacher;
      this.route.navigate(['teacher/update/', this.teacher.id])
   }

   deleteById() {

   }
}
