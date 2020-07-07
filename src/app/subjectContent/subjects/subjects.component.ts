import { Component, OnInit } from '@angular/core';
import { Names } from 'src/app/models/Names';
import Utils from 'src/app/services/Utils';

@Component({
  selector: 'subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {

  items: Array<Names> = [
    {
      "isDone": false,
      "name": "1111111"
    },
    {
      "isDone": false,
      "name": "22222"
    },
    {
      "isDone": false,
      "name": "33333"
    },
    {
      "isDone": false,
      "name": "44444"
    }];
  errorMessage: string;

  constructor() {
    // this.service.getComplaints().subscribe(
    //   data => {
    //     this.complaints = Utils.addIsDone(Utils.getNames(data))
    //     if (Utils.patient) {
    //       Utils.markSelected(Utils.patient.complaints, this.complaints);
    //     }
    //   },
    //   error => this.errorMessage = error
    // );
  }


  public toggleItem(name: Names) {
    //toggle between selected or not
    name.isDone = !name.isDone;
  }

  /**
   * get all selected patient exams name only
   */
  public getSelectedItems() {
    return Utils.getSelectedNames(this.items);
  }
}
