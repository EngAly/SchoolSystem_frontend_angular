import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/services/level.service';
import { Level } from 'src/app/models/Level';
import { LayoutAbstracts } from 'src/app/interfaces/LayoutAbstracts';

@Component({
  selector: 'classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements LayoutAbstracts<Level>{

  items: Level[];

  constructor(private service: LevelService) {
    this.service.getAll(100, 0, 'name', 'asc').subscribe(
      (data: Level[]) => {
        this.items = data['content'];
      })
  }

  public toggleItem(event: any, item: Level) {
    if (event.getModifierState && event.getModifierState('Control')) {
      item['isDone'] = item['isDone'] == true ? false : true;
    } else {
      this.items.filter(item => item['isDone']).filter(item => delete item['isDone']);
      item['isDone'] = item['isDone'] == true ? false : true;
    }
  }

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
