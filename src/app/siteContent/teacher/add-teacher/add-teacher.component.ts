import { Component, OnInit, ViewChild } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';
import { ClassesComponent } from 'src/app/layout/classes/classes.component';
import { SubjectsComponent } from 'src/app/layout/subjects/subjects.component';

@Component({
   selector: 'app-add-teacher',
   templateUrl: './add-teacher.component.html',
   styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements EndPointAbstracts {

   teacher = new Teacher();
   inPrograss: boolean = false;
   @ViewChild(ClassesComponent) classesChild: any;
   @ViewChild(SubjectsComponent) subjectsChild: any;

   formData = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      // email:new FormControl('',[Validators.required,Validators.email]),
      email: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      doh: new FormControl('', Validators.required),
      graduateDate: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      // specialization:new FormControl('',Validators.required),
      ssn: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      notes: new FormControl('', []),
      address: new FormControl('', Validators.required),
      qualification: new FormControl('', Validators.required),
      ex: new FormControl('', Validators.required)
   })

   constructor(private service: TeacherService) { }

   /**
    * api to get all controls in formData
    * to use them in View
    */
   get controls() {
      return this.formData.controls;
   }

   /**
    * get selected levels from child component and show
    * it in teacher component to add teacher levels will 
    * study in them
    */
   setLevels() {
      this.teacher.levels = this.classesChild.getSelectedItems();
   }

   /**
    * get selected subjects from child component and show
    * it in teacher component to add teacher subjects will 
    * study them to student
    */
   setSubjects() {
      this.teacher.subject = this.subjectsChild.getSelectedItems()[0]['name'];
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
      // alert(JSON.stringify(this.teacher))
      this.service.add(this.teacher).then(
         saved => {
            if (saved) {
               alert(document.getElementById('savedMsg').textContent);
               this.reset();
            } else {
               alert(document.getElementById('unsavedMsg').textContent)
            }
            this.inPrograss = false;
         });
      // console.log(this.teacher)
   }

   /**
    * reset all form controls to pristine state
    */
   private reset() {
      this.formData.reset();
   }
}
        // $(document).ready(() => {
        //   $('.messagesuccess').css({ 'font-size': '150%' }).fadeIn(1500).fadeOut(2000)
        //$('.messagesuccess').fadeIn(3000)
        //   $('.message').fadeIn('fast')
        // }, 1000) 