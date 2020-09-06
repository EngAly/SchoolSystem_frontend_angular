import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Level } from 'src/app/models/Level';
import { LevelService } from 'src/app/services/level.service';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'class-details',
   templateUrl: './class-details.component.html',
   styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit {

   class = new Level();
   // flag to use if there data
   hasData: boolean;

   id: any

   constructor(private service: LevelService, private _cache: CacheObjectService,
      private activeRoute: ActivatedRoute, private route: Router) { }

   ngOnInit(): void {
      this.id = this.activeRoute.snapshot.paramMap.get('id')
      if (this.id) {
         if (Object.keys(this._cache.getObject).length > 0) {
            this.class = this._cache.getObject;
            this.hasData = true;
         } else {
            parseInt(this.id) ? this.getById(this.id) : this.hasData = false;
         }
      } else
         this.hasData = false
   }

   /**
     * get worker from server side by its id
     * @param id: provide id to get object by it
     */
   getById(id: number) {
      this.service.getById(id).subscribe(
         data => {
            this.class = data;
            this.hasData = true;
         }, error => {
            this.hasData = false;
            console.log(error)
         })
   }

   update() {
      this._cache.setObject = this.class;
      this.route.navigate(['class/update/', this.class.id])
   }

   deleteById() {
      this.service.deleteById(this.class.id).subscribe(
         data => {
            alert("Data Is Deleted Successfully")
            this.route.navigate(['worker/search'])
         }, err => {
            if (err['status'] == 401 || err['status'] == 403) {
               alert("You Not Have Permissions")
            }
            console.log(err);
         }
      )
   }
}
