import { Component, OnInit } from '@angular/core';
import { LayoutAbstracts } from 'src/app/interfaces/LayoutAbstracts';

@Component({
  selector: 'student-status',
  templateUrl: './student-status.component.html',
  styleUrls: ['./student-status.component.scss']
})
export class StudentStatusComponent implements LayoutAbstracts<string> {

  items = [{ "name": "Pending" },
  { "name": "Excellent" },
  { "name": "Very Good" },
  { "name": "Good" },
  { "name": "Mediam" },
  { "name": "Failure" }];

  public toggleItem(item: string) {
    this.items.filter(item => item['isDone']).filter(item => delete item['isDone']);
    item['isDone'] = item['isDone'] == true ? false : true;
  }

  getSelectedItems(): string {
    // check if user select item or not from list
    if (this.items.filter(item => item['isDone'])[0] != undefined) {
      return this.items.filter(item => item['isDone'])[0]['name'];
    }
  }

}
