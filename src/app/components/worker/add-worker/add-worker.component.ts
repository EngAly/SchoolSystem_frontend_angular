import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Worker } from 'src/app/models/Worker';
import { GuardianshipsComponent } from 'src/app/layout/guardianships/guardianships.component';
import { WorkerService } from 'src/app/services/worker.service';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-add-worker',
   templateUrl: './add-worker.component.html',
   styleUrls: ['./add-worker.component.scss']
})
export class AddWorkerComponent implements EndPointAbstracts, OnInit {

   worker = new Worker();
   inPrograss: boolean = false;

   // if url has id store it in id so process in update statue
   id: number;

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

   constructor(private service: WorkerService, private _cache: CacheObjectService, private activeRoute: ActivatedRoute) {
   } Boolean

   ngOnInit(): void {
      this.id = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
      // if url has id so dataflow intented to update statue
      if (this.id) {
         if (Object.keys(this._cache.getObject).length > 0) {
            this.worker = this._cache.getObject
            this.controls.gender.setValue(this.worker.gender);
         } else {
            this.getById(this.id);
            ;

         }
      }
   }

   private getById(id: number) {
      return this.service.getById(id).subscribe(
         data => {
            this.worker = data
            this.controls.gender.setValue(this.worker.gender)
         }, err => console.log(err))
   }

   public setGender() {
      this.worker.gender = this.formData.get('gender').value
   }

   public setGuardianships() {
      this.worker.guardianships = this.guardianshipChild.getSelectedItems();
   }

   public save() {
      this.setGuardianships();
      // alert(JSON.stringify(this.worker));
      this.inPrograss = true;
      // if id has value dataflow inten intented to update statue
      // if id not has value dataflow intented to save statue
      this.id ? this.update() : this.add()
   }

   private add() {
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

   private update() {
      this.service.update(this.worker).then(
         (status: number) => {
            if (status == 200) {
               alert(document.getElementById('saved').textContent);
               this.reset();
            } else if (status === 401 || status === 403) {
               alert("don't have permissions")
            } else {
               alert(document.getElementById('unsaved').textContent)
            }
            this.inPrograss = false;
         }
      );
   }

   private reset() {
      this.controls.reset
   }
}
