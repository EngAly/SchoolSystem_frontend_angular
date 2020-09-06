import { Component, OnInit, ViewChild } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import { ClassesComponent } from 'src/app/layout/classes/classes.component';
import { SubjectsComponent } from 'src/app/layout/subjects/subjects.component';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-add-teacher',
   templateUrl: './add-teacher.component.html',
   styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements EndPointAbstracts, OnInit {

   teacher = new Teacher();
   inPrograss: boolean = false;
   @ViewChild(ClassesComponent) classesChild: any;
   @ViewChild(SubjectsComponent) subjectsChild: any;
   id: any;
   hasData = true;

   // test if component is ready
   isLoaded = false;

   formData = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('Male', Validators.required),
      // email:new FormControl('',[Validators.required,Validators.email]),
      email: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('Single', Validators.required),
      dob: new FormControl('', Validators.required),
      doh: new FormControl('', Validators.required),
      graduateDate: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      // specialization:new FormControl('',Validators.required),
      ssn: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{11}")]),
      notes: new FormControl('', []),
      address: new FormControl('', Validators.required),
      qualification: new FormControl('', Validators.required),
      ex: new FormControl('', Validators.required)
   })

   /**
       * api to get all controls in formData
       * to use them in View
       */
   get controls() {
      return this.formData.controls;
   }

   constructor(private service: TeacherService, private _cache: CacheObjectService, private activeRoute: ActivatedRoute) {
   }

   ngOnInit(): void {
      this.ready2update();
   }

   private ready2update() {
      this.id = this.activeRoute.snapshot.paramMap.get('id');
      // if url has id so dataflow intented to update statue
      if (this.id) {
         let teacher = this._cache.getObject as Teacher
         if (teacher.maritalStatus) {
            // if (Object.keys(this._cache.getObject).length > 0) {
            this.teacher = this._cache.getObject
            this.controls.gender.setValue(this.teacher.gender);
            this.controls.maritalStatus.setValue(this.teacher.maritalStatus);
         } else {
            parseInt(this.id) ? this.getById(this.id) : this.hasData = false;
         }
      } else
         this.isLoaded = true
   }

   private getById(id: number) {
      return this.service.getById(id).subscribe(
         data => {
            this.teacher = data
            this.controls.gender.setValue(this.teacher.gender)
            this.hasData = this.teacher ? true : false
         }, err => {
            this.hasData = false;
            console.log(err)
         });
   }

   /**
    * get selected levels from child component and show
    * it in teacher component to add teacher levels will 
    * study in them
    */
   setLevels() {
      if (this.classesChild.getSelectedItems())
         this.teacher.levels = this.classesChild.getSelectedItems();
   }

   /**
    * get selected subjects from child component and show
    * it in teacher component to add teacher subjects will 
    * study them to student
    */
   setSubjects() {
      if (this.subjectsChild.getSelectedItems()[0] != null) {
         this.teacher.subject = this.subjectsChild.getSelectedItems()[0]['name'];
      }
   }

   /**
    * set teacher gender when select it to teacher instance 
    * note that:-
    * we can't use ngModel with radio button
    */
   setGender() {
      this.teacher.gender = this.controls.gender.value;
   }

   /**
   * set teacher marital status when select it to teacher instance 
   * note that:-
   * we can't use ngModel with radio button
   */
   setMaritalStatus() {
      this.teacher.maritalStatus = this.controls.maritalStatus.value;
   }

   /**
    * prepare all out fields that want special case to 
    * handle them and embed all to teacher insatnce
    */
   private preparedObject() {
      this.setGender()
      this.setMaritalStatus()
      this.setLevels()
      this.setSubjects()
   }

   /**
    * save current object to database
    */
   save() {
      this.inPrograss = true;
      this.preparedObject();
      this.inPrograss = true;
      // if id has value dataflow inten intented to update statue
      // if id not has value dataflow intented to save statue
      this.id ? this.update() : this.add()
   }

   private add() {
      this.service.add(this.teacher).then(
         (status: number) => {
            if (status == 200) {
               alert(document.getElementById('saved').textContent);
               this.reset();
            } else if (status == 401 || status == 403) {
               alert(document.getElementById('notPermitMsg').textContent)
            }
            else { alert(document.getElementById('unsavedMsg').textContent) }
            this.inPrograss = false;
         }
      );
   }

   private update() {
      this.service.update(this.teacher).then(
         (status: number) => {
            if (status == 200) {
               alert(document.getElementById('saved').textContent);
               this.reset();
            } else if (status === 401 || status === 403) {
               alert(document.getElementById('notPermitMsg').textContent)
            } else {
               alert(document.getElementById('unsaved').textContent)
            }
            this.inPrograss = false;
         }
      );
   }

   /**
    * reset all form controls to pristine state
    */
   private reset() {
      this.formData.reset();
      //  to clear object data make it {} instead of null
      this._cache.setObject = {}
   }
}
        // $(document).ready(() => {
        //   $('.messagesuccess').css({ 'font-size': '150%' }).fadeIn(1500).fadeOut(2000)
        //$('.messagesuccess').fadeIn(3000)
        //   $('.message').fadeIn('fast')
        // }, 1000) 