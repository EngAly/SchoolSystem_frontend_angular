import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'src/app/models/Subject';
import { SubjectService } from 'src/app/services/subject.service';
import { LayoutAbstracts } from 'src/app/interfaces/LayoutAbstracts';

@Component({
   selector: 'subjects',
   templateUrl: './subjects.component.html',
   styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements LayoutAbstracts<Subject>{

   items: Subject[];

   // count of selected classes
   count = 0
   // if user press update in details will recive selected item here
   @Input() selected: string;

   /**
    * when component in construct statue will go to SubjectService
    * and call getAllSubjects API to get all available subjects in school
    * and show them to user
    * @param service: it injected automatically
    */
   constructor(private service: SubjectService) {
      this.service.getAll(100).subscribe(
         (data: Subject[]) => {
            this.items = data['content'];
            this.whenUpdate()
         },
         error => {
            console.log(error)
         }
      );
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
   public toggleItem(item: Subject) {
      this.items.filter(item => item['isDone']).filter(item => delete item['isDone']);
      item['isDone'] = item['isDone'] == true ? false : true;
      this.count = 1
   }

   /**
    * return array with items that user selected them to caller
    * that can embeded them to teacher / student ot other objects
    */
   getSelectedItems(): Subject[] {
      let selected = new Array<Subject>();
      if (this.items) {
         this.items.filter(item => {
            if (item['isDone']) {
               selected.push({ id: item.id, name: item.name, desc: item.desc })
            }
         })
      }
      return selected;
   }
}
