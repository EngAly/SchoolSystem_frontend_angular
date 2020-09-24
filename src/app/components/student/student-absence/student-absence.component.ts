import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/Student';
import { Absence } from 'src/app/models/Absence';
import { AbsenceService } from 'src/app/services/absence';

@Component({
   selector: 'app-student-absence',
   templateUrl: './student-absence.component.html',
   styleUrls: ['./student-absence.component.scss']
})
export class StudentAbsenceComponent {

   // search field
   name: string
   students: Array<Student> = []
   selected = new Student();

   absence = new Absence()

   inPrograss: boolean
   // pages options
   currentPage: number

   searchForm = new FormGroup({ name: new FormControl('', [Validators.required]) })

   constructor(private service: StudentService) { }

   get controls() { return this.searchForm.controls }

   searchByName() {
      this.inPrograss = true;
      this.service.getByLevel(this.name).subscribe(
         data => {
            this.students = data['content']
            // this.currentPage = data['pageable']['pageNumber'];
            this.inPrograss = false
         },
         error => {
            this.inPrograss = false
            console.log(error)
         });
   }

   sortBy() {

   }

   public clearResults() {
      // if (this.name.length == 0) {
      //    this.items = null;
   }

   public toggleSelected(item: Student) {
      this.selected.absences = [];
      this.absence = { date: new Date(1993, 12, 27), reason: "ill" }

      // this.selected = []
      item['isDone'] = !item['isDone'];
      // this.students.filter(student => { student['isDone'] ? this.selected.push(student) : true })
      this.students.filter(student => {
         if (student['isDone']) { this.selected = student }
      })
      this.selected.absences.push(this.absence);
   }

   public save() {
      console.log(this.absence);

      this.service.add(this.selected).then(
         (status: number) => {
            if (status == 200) {
               alert(document.getElementById('saved').textContent);
            } else if (status == 401 || status == 403) {
               alert(document.getElementById('notPermitMsg').textContent)
            }
            else { alert(document.getElementById('unsavedMsg').textContent) }
            this.inPrograss = false;
         }
      );
   }
}