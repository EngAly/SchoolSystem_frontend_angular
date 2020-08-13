import { Component, OnInit, Input } from '@angular/core';
import { LayoutAbstracts } from 'src/app/interfaces/LayoutAbstracts';

@Component({
   selector: 'student-status',
   templateUrl: './student-status.component.html',
   styleUrls: ['./student-status.component.scss']
})
export class StudentStatusComponent implements LayoutAbstracts<string>, OnInit {


   items = [{ "name": "Pending" }, { "name": "Excellent" },
   { "name": "Very Good" }, { "name": "Good" },
   { "name": "Mediam" }, { "name": "تحت الفشيخ" }];

   // count of selected classes
   count = 0

   @Input() selected: string;

   /**
    * when component in construct statue will go to SubjectService
    * and call getAllSubjects API to get all available subjects in school
    * and show them to user
    * @param service: it injected automatically
    */
   constructor() { }

   ngOnInit(): void {
      this.whenUpdate()
   }

   /**
    * if user press update buuton in details then would check
    * if there items selected previous in Subjects for caller or not
    * if there previous selected levels then select them automatically
    */
   whenUpdate() {
      if (this.selected.length > 0 && this.items.length > 0) {
         this.items.filter(raw => {
            if (raw.name == this.selected) raw['isDone'] = true
         });
         this.count = this.items.filter(item => item['isDone']).length
      }
   }

   /**
    * if user press about item in list then there one option
    * if user click on item then there only one item would be
     * @param item: item that user press on it
    */
   public toggleItem(item: string) {
      this.items.filter(item => item['isDone']).filter(item => delete item['isDone']);
      item['isDone'] = item['isDone'] == true ? false : true;
      this.count = this.items.filter(item => item['isDone']).length
   }

   /**
    * return array with items that user selected them to caller
    * that can embeded them to teacher / student ot other objects
    */
   getSelectedItems(): string {
      // check if user select item or not from list
      if (this.items.filter(item => item['isDone'])[0] != undefined) {
         return this.items.filter(item => item['isDone'])[0]['name'];
      }
   }

}
