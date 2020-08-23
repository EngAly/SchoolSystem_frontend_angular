import { Component, Input } from '@angular/core';
import { LevelService } from 'src/app/services/level.service';
import { Level } from 'src/app/models/Level';
import { LayoutAbstracts } from 'src/app/interfaces/LayoutAbstracts';

@Component({
   selector: 'classes',
   templateUrl: './classes.component.html',
   styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements LayoutAbstracts<Level> {


   items: Level[];
   // count of selected classes
   count = 0
   // if user press update in details will recive selected item here
   @Input() selected: Level[];

   /**
    * when component in construct statue will go to LevelService
    * and call getAllLevels API to get all available levels in school
    * and show them to user
    * @param service: it injected automatically
    */
   constructor(private service: LevelService) {
      this.service.getAll(100, 0, 'name', 'asc').subscribe(
         (data: Level[]) => {
            this.items = data['content'];
            this.whenUpdate()
         })
   }

   /**
    * if user press update buuton in details then would check
    * if there items selected previous in levels for teacher or not
    * if there previous selected levels then select them automatically
    */
   whenUpdate() {
      if (this.selected.length > 0 && this.items.length > 0) {
         this.items.filter(raw => {
            this.selected.filter(selected => {
               if (raw.name == selected.name) raw['isDone'] = true
            })
         });
         this.count = this.items.filter(item => item['isDone']).length
      }
   }

   /**
    * if user press about item in list then there two option
    * if user press ctrl+click on item then would select multi items
    * if user click on item without ctrl then there only one item would be
    * @param event: to access ModifierState ctrl,shift,...
    * @param item: item that user press on it
    * 
    */
   public toggleItem(event: any, item: Level) {
      if (event.getModifierState && event.getModifierState('Control')) {
         item['isDone'] = item['isDone'] == true ? false : true;
         this.count = this.items.filter(item => item['isDone']).length
      } else {
         this.items.filter(item => item['isDone']).filter(item => delete item['isDone']);
         item['isDone'] = item['isDone'] == true ? false : true;
         this.count = 1;
      }
   }

   /**
    * return array with items that user selected them to caller
    * that can embeded them to teacher / student ot other objects
    */
   getSelectedItems(): Level[] {
      // don't forget to declare new key word  OR get undefined
      let selected = new Array<Level>();
      if (this.items) {
         this.items.filter(item => {
            if (item['isDone']) {
               selected.push({ id: item.id, name: item.name, currentSize: item.currentSize, floor: item.floor, maxSize: item.maxSize, desc: item.desc })
            }
         })
      }
      return selected;
      // return this.items.filter(item => item['isDone']).filter(item => delete item['isDone'])[0];
   }
}
