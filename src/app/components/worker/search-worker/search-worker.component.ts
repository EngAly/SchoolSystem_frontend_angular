import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/models/Worker';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheObjectService } from 'src/app/services/cache-object.service';

@Component({
   selector: 'app-search-worker',
   templateUrl: './search-worker.component.html',
   styleUrls: ['./search-worker.component.scss']
})
export class SearchWorkerComponent {

   name: string;
   items: Array<Worker> = [];
   inPrograss: boolean;

   checkName = new FormGroup({
      name: new FormControl('', [Validators.required])
   });

   constructor(private service: WorkerService, private activeRoute: ActivatedRoute,
      private route: Router, private _cache: CacheObjectService) { }

   get controls() {
      return this.checkName.controls;
   }

   searchByName() {
      this.inPrograss = true;
      this.service.getByName(this.name).subscribe(
         data => {
            // this._cache.setObject$ = 
            this.items = data['content'];
            this.inPrograss = false;
         },
         error => {
            console.log(error)
         });
   }

   /**
    * when user click on any record in table from searched
    * result will open new component  details that show all selected
    * record details in seperated component 
    * @param item: item that user clicked on it 
    */
   getDetails(item: Worker) {
      this._cache.setObject = item;
      this.route.navigate(['worker/details/', item.id])
   }

   /**
    * when user delete string in search box so that automatically
    * all search results will be delete to start new search
    */
   clearResults() {
      if (this.name.length == 0) {
         this.items = null;
      }
   }
}
