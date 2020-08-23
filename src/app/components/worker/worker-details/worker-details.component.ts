import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/models/Worker';
import { WorkerService } from 'src/app/services/worker.service';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'app-worker-details',
   templateUrl: './worker-details.component.html',
   styleUrls: ['./worker-details.component.scss']
})
export class WorkerDetailsComponent implements OnInit {

   worker = new Worker();
   // flag to use if there data
   hasData: boolean;

   constructor(private service: WorkerService, private _cache: CacheObjectService,
      private activeRoute: ActivatedRoute, private route: Router) { }

   ngOnInit(): void {
      let id = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
      if (Object.keys(this._cache.getObject).length > 0) {
         this.worker = this._cache.getObject;
         this.hasData = true;
      } else {
         if (id) {
            this.getById(id);
         }
      }
   }

   /**
     * get worker from server side by its id
     * @param id: provide id to get object by it
     */
   getById(id: number) {
      this.service.getById(id).subscribe(
         data => {
            this.worker = data;
            this.hasData = this.worker.name.length > 0 ? true : false;
         }, error => {
            this.hasData = false;
            console.log(error)
         }
      )
   }

   update() {
      this._cache.setObject = this.worker;
      this.route.navigate(['worker/update/', this.worker.id])
   }

   deleteById() {

   }
}
