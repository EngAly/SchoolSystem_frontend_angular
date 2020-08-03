import { Component, OnInit } from '@angular/core';
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

  constructor(private service: SubjectService) {
    this.service.getAll(100).subscribe(
      data => {
        this.items = data['content'];
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
