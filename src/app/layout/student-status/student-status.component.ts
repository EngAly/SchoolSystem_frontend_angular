import { Component, OnInit, Input, OnChanges, AfterContentInit } from '@angular/core';
import { LayoutAbstracts } from 'src/app/interfaces/LayoutAbstracts';

@Component({
   selector: 'student-status',
   templateUrl: './student-status.component.html',
   styleUrls: ['./student-status.component.scss']
})
export class StudentStatusComponent implements LayoutAbstracts<string>, OnChanges {

   items = [{ "name": "Pending" }, { "name": "Excellent" },
   { "name": "Very Good" }, { "name": "Good" },
   { "name": "Mediam" }, { "name": "Accepted" },
   { "name": "failure" }];

   // count of selected classes
   count = 0

   @Input() selected: string;

   constructor() { }

   ngOnChanges(): void {
      // setTimeout(() => {
      this.whenUpdate()
      // });
   }

   /**
    * if user press update buuton in details then would check
    * if there items selected previous in Subjects for caller or not
    * if there previous selected levels then select them automatically
    */
   whenUpdate() {
      if (this.selected && this.items.length > 0) {
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
