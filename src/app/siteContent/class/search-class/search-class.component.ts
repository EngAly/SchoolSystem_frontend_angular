import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LevelService } from 'src/app/services/level.service';
import { Level } from 'src/app/models/Level';

@Component({
  selector: 'app-search-class',
  templateUrl: './search-class.component.html',
  styleUrls: ['./search-class.component.scss']
})
export class SearchClassComponent {


  name: string;
  levels: Array<Level> = [];
  inPrograss: boolean;
  currentPage: number = 0;


  checkName = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private service: LevelService) {
  }

  get controls() {
    return this.checkName.controls;
  }

  search() {
    this.inPrograss = true;
    this.service.getByName(this.name).subscribe(
      data => {
        this.levels = data;
        this.inPrograss = false;
      },
      error => {
        console.log(error)
      });
  }

  public clearResults() {
    if (this.name.length == 0) {
      this.levels = null;
    }
  }

  // First() {
  //   this.currentPage = 0;
  //   this.onCurrentPageChange()
  // }

  // Previous() {
  //   this.currentPage > 0 ? this.currentPage-- : this.currentPage
  //   this.onCurrentPageChange()
  // }

  // Next() {
  //   // this.currentPage < this.totalPages - 1 ? this.currentPage++ : this.currentPage
  //   if (this.currentPage < this.totalPages - 1) {
  //     this.currentPage++
  //     this.onCurrentPageChange()
  //   }


  // }

  // Last() {
  //   this.currentPage = this.totalPages - 1;
  //   this.onCurrentPageChange()
  // }

}


