import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Level } from 'src/app/models/Level';
import { LevelService } from 'src/app/services/level.service';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-add-class',
   templateUrl: './add-class.component.html',
   styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements EndPointAbstracts, OnInit {

   class = new Level();
   inPrograss: boolean;
   id: any
   // flag to use if there data
   hasData = true;

   formData = new FormGroup({
      name: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      maxSize: new FormControl('', Validators.required),
      currentSize: new FormControl('', Validators.required)
   })

   constructor(private service: LevelService, private _cache: CacheObjectService, private activeRoute: ActivatedRoute) { }

   get controls() {
      return this.formData.controls;
   }

   ngOnInit(): void {
      this.ready2update()
   }

   private ready2update() {
      this.id = this.activeRoute.snapshot.paramMap.get('id');
      // if url has id so dataflow intented to update statue
      if (this.id) {
         // test if object cached get it
         if (Object.keys(this._cache.getObject).length > 0) {
            this.class = this._cache.getObject
            this.hasData = true;
         }
         else
            parseInt(this.id) ? this.getById(this.id) : this.hasData = false;
      }
   }

   private getById(id: number) {
      return this.service.getById(id).subscribe(
         data => {
            this.class = data
            this.hasData = true
         }, err => {
            this.hasData = false;
            console.log(err)
         });
   }

   save() {
      this.inPrograss = true;
      parseInt(this.id) ? this.update() : this.add()
   }

   private add() {
      this.service.add(this.class).then(
         (status: number) => {
            if (status == 200) {
               alert(document.getElementById('saved').textContent);
               this.reset();
            } else if (status == 401 || status == 403)
               alert(document.getElementById('notPermitMsg').textContent)
            else
               alert(document.getElementById('unsavedMsg').textContent)
            this.inPrograss = false;
         });
   }

   private update() {
      this.service.update(this.class).then(
         (status: number) => {
            if (status == 200) {
               alert(document.getElementById('saved').textContent);
               this.reset();
            } else if (status == 401 || status == 403)
               alert(document.getElementById('notPermitMsg').textContent)
            else
               alert(document.getElementById('unsaved').textContent)
            this.inPrograss = false;
         });
   }

   reset() {
      this.formData.reset();
      //  to clear object data make it {} instead of null
      this._cache.setObject = {}
   }

}