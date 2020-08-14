import { Component, OnInit } from '@angular/core';
import { worker, Worker } from 'cluster';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkerService } from 'src/app/services/worker.service';

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

   constructor(private service: WorkerService) { }

   get controls() {
      return this.checkName.controls;
   }

   search() {
      this.inPrograss = true;
      this.service.getByName(this.name).subscribe(
         data => {
            this.items = data['content'];
            this.inPrograss = false;
         },
         error => {
            console.log(error)
         });
   }

   getDetails(item: Worker) {
      alert(JSON.stringify(item));
   }
}
