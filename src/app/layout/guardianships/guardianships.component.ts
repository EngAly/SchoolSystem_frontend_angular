import { Component, OnInit } from '@angular/core';
import { GuardianshipService } from 'src/app/services/guardianship.service';
import { Guardianship } from 'src/app/models/Guardianship';
import { LayoutAbstracts } from 'src/app/interfaces/LayoutAbstracts';

@Component({
   selector: 'guardianships',
   templateUrl: './guardianships.component.html',
   styleUrls: ['./guardianships.component.scss']
})
export class GuardianshipsComponent implements LayoutAbstracts<Guardianship>{

   items: Guardianship[];
   count = 0;

   constructor(private service: GuardianshipService) {
      this.service.getAll().subscribe(
         data => {
            this.items = data;
            // console.log(data);
         },
         error => console.log(error)
      );
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
