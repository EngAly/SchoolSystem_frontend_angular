import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Worker } from 'src/app/models/Worker';
import { GuardianshipsComponent } from 'src/app/layout/guardianships/guardianships.component';
import { WorkerService } from 'src/app/services/worker.service';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { CacheObjectService } from 'src/app/services/cache-object.service';
 
@Component({
   selector: 'app-add-worker',
   templateUrl: './add-worker.component.html',
   styleUrls: ['./add-worker.component.scss']
})
export class AddWorkerComponent implements EndPointAbstracts, OnInit {

   worker = new Worker();
   inPrograss: boolean = false;

   @ViewChild(GuardianshipsComponent) guardianshipChild;

   formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      //  validate phone number with required and format required pattern
      phone: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{11}")]),
      gender: new FormControl('Male', [Validators.required]),
      age: new FormControl('', [Validators.required])
      //  desc: new FormControl('', [])
   });

   get controls() {
      return this.formData.controls;
   }

   constructor(private service: WorkerService, private _cache: CacheObjectService) {
      if (Object.keys(this._cache.getObject).length > 0) {
         this.worker = this._cache.getObject
         this.controls.gender.setValue(this.worker.gender);
      }
   }

   ngOnInit(): void {

   }



   handleGenderChange(event: any) {
      this.worker.gender = this.formData.get('gender').value
   }

   private reset() {
      this.controls.reset
   }

   save() {
      this.inPrograss = true;
      this.worker.guardianships = this.guardianshipChild.getSelectedItems();
      // alert(JSON.stringify(this.worker));
      this.service.add(this.worker).then(
         (saved: Boolean) => {
            if (saved) {
               alert(document.getElementById('saved').textContent);
               this.reset();
            } else {
               alert(document.getElementById('unsaved').textContent)
            }
            this.inPrograss = false;
         }
      );

   }
}
