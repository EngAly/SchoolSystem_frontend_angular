import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Student } from 'src/app/models/Student';
import { StudentStatusComponent } from 'src/app/layout/student-status/student-status.component';
import { ClassesComponent } from 'src/app/layout/classes/classes.component';
import { AddGuardianComponent } from '../../guardian/add-guardian/add-guardian.component';
import { StudentService } from 'src/app/services/student.service';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-add-student',
   templateUrl: './add-student.component.html',
   styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements EndPointAbstracts, OnInit {

   student: Student = new Student();
   inPrograss: boolean = false;
   isGuardianValid: boolean = false;
   id: any
   hasData = true;
   levels = []

   // test if component is ready
   isLoaded = false;

   @ViewChild(StudentStatusComponent) statusChild: any;
   @ViewChild(ClassesComponent) classesChild: any;
   @ViewChild(AddGuardianComponent) guardianChild: any;

   formData = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('Male', Validators.required),
      // gender: new FormControl('', Validators.required),
      // email: new FormControl('', [Validators.required, Validators.email]),
      email: new FormControl('', []),
      dob: new FormControl('', Validators.required),
      joinDate: new FormControl('', Validators.required),
      paidFees: new FormControl('', Validators.required),
      remainFees: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
   });

   constructor(private service: StudentService, private _cache: CacheObjectService, private activeRoute: ActivatedRoute) {

   }

   get controls() {
      return this.formData.controls;
   }

   ngOnInit(): void {
      this.ready2update();
   }

   private ready2update() {
      this.id = this.activeRoute.snapshot.paramMap.get('id');
      // if url has id so dataflow intented to update statue
      if (this.id) {
         // test if object cached get it
         if (Object.keys(this._cache.getObject).length > 0) {
            this.student = this._cache.getObject
            this.setLazyProperties()
         } else
            // getById call it in update state only
            parseInt(this.id) ? this.getById(this.id) : this.hasData = false;
      } else
         this.isLoaded = true
   }

   private getById(id: number) {
      return this.service.getById(id).subscribe(
         data => {
            this.student = data
            this.setLazyProperties()
            this.hasData = this.student ? true : false
         }, err => {
            this.hasData = false;
            console.log(err)
         });
   }

   private setLazyProperties() {
      this.levels = [];
      this.controls.gender.setValue(this.student.gender)
      this.levels.push(this.student.level)
   }

   setGender() {
      this.student.gender = this.controls.gender.value;
   }

   private setStatus() {
      this.student.status = this.statusChild.getSelectedItems();
   }

   private setLevel() {
      this.student.level = this.classesChild.getSelectedItems()[0];
   }

   private setGuardian() {
      this.student.guardian = this.guardianChild.getCurrentObject();
   }

   /**
    * confirm that all guardian child component is entirly
    * correct and all fileds have values so that this method return
    * true if all is perfect other it return false
    * @param event 
    */
   handleValidation(event) {
      this.isGuardianValid = this.guardianChild.isValid();
   }

   getCurrentObject() {
      this.setStatus();
      this.setLevel();
      this.setGuardian();
   }

   save() {
      this.student.grades = []
      this.getCurrentObject();
      // disable save and reset process
      this.inPrograss = true;
      this.id ? this.update() : this.add()
   }

   private add() {
      this.service.add(this.student).then(
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
      this.service.update(this.student).then(
         (status: number) => {
            if (status == 200) {
               alert(document.getElementById('saved').textContent);
               this.reset();
            } else if (status === 401 || status === 403)
               alert(document.getElementById('notPermitMsg').textContent)
            else
               alert(document.getElementById('unsaved').textContent)
            this.inPrograss = false;
         }
      );
   }

   reset() {
      this.formData.reset();
      //  to clear object data make it {} instead of null
      this._cache.setObject = {}
   }
}
