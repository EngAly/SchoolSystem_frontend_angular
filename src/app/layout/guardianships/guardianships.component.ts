import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GuardianshipService } from 'src/app/services/guardianship.service';
import { Guardianship } from 'src/app/models/Guardianship';
import { LayoutAbstracts } from 'src/app/interfaces/LayoutAbstracts';

@Component({
   selector: 'guardianships',
   templateUrl: './guardianships.component.html',
   styleUrls: ['./guardianships.component.scss']
})
export class GuardianshipsComponent implements LayoutAbstracts<Guardianship>, OnChanges {


   items: Guardianship[];
   count = 0;
   @Input() selected: Guardianship[];

   constructor(private service: GuardianshipService) { }

   ngOnChanges(): void {
      this.service.getAll(100, 0, 'name', 'asc').subscribe(
         data => {
            this.items = data['content'];
            this.whenUpdate();
         },
         error => console.log(error)
      )
   }

   whenUpdate() {
      if (this.selected != undefined && this.items.length > 0) {
         this.items.filter(raw => {
            this.selected.filter(selected => {
               if (raw.name == selected.name) raw['isDone'] = true
            })
         });
         this.count = this.items.filter(item => item['isDone']).length
      }
   }

   public toggleItem(item: Guardianship) {
      item['isDone'] = item['isDone'] == true ? false : true;
      this.count = this.items.filter(item => item['isDone']).length
   }

   getSelectedItems(): Guardianship[] {
      // alert(JSON.stringify(this.items.filter(item => item['isDone']).filter(item => delete item['isDone'])));
      return this.items.filter(item => item['isDone']).filter(item => delete item['isDone']);
   }


}
