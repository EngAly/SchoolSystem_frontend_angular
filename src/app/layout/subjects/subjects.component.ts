import { Component, OnInit } from '@angular/core';
import { Names } from 'src/app/models/Names';
import { ILayout } from 'src/app/interfaces/ILayout';
import { Subject } from 'src/app/models/Subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements ILayout<Subject>{

  items: Subject[];

  constructor(private service: SubjectService) {
    this.service.getAll().subscribe(
      data => {
        this.items = data;
        // console.log(data);
      },
      error => console.log(error)
    );
  }

  public toggleItem(item: Subject) {
    item['isDone'] = item['isDone'] == true ? false : true;
  }

  getSelectedItems(): Subject[] {
    // alert(JSON.stringify(this.items.filter(item => item['isDone']).filter(item => delete item['isDone'])));
    return this.items.filter(item => item['isDone']).filter(item => delete item['isDone']);
  }
}
