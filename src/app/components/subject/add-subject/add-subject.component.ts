import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'src/app/models/Subject';
import { SubjectService } from 'src/app/services/subject.service';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';

@Component({
   selector: 'app-add-subject',
   templateUrl: './add-subject.component.html',
   styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements EndPointAbstracts {

   subject = new Subject();
   inPrograss: boolean;

   formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      // desc: new FormControl('', [])
   });


   constructor(private service: SubjectService) { }

   get controls() {
      return this.formData.controls;
   }

   private reset() {
      this.formData.reset();
   }

   save() {
      this.inPrograss = true;
      this.service.add(this.subject).subscribe(
         data => {
            if (data) {
               alert(document.getElementById('savedMsg').textContent);
               this.reset();
               this.inPrograss = false;
            }
         }, err => {
            // 401 unauthorized
            // 403 forbidden
            if (err['status'] == 401 || err['status'] == 403) {
               alert(document.getElementById('notPermitMsg').textContent)
            }
            else
               alert(document.getElementById('unsavedMsg').textContent)
            this.inPrograss = false;
         }
      );
      console.log(this.subject)
   }

}
