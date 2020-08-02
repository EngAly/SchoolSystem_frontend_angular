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

  // pages options
  currentPage: number = 0;
  pageNo: number;
  direction = "desc";
  sort: string;
  totalPages: number;
  noData = true;


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
    this.getPage();
  }

  getPage() {
    this.service.getByName(this.name, this.currentPage).subscribe(
      data => {
        this.levels = data['content'];
        if (this.levels.length > 0) {
          this.noData = false;
        }
        // this.currentPage = data['pageable']['pageNumber'];
        this.totalPages = data['totalPages'];
        this.inPrograss = false;
      },
      error => {
        console.log(error)
      });
  }

  public clearResults() {
    if (this.name.length == 0) {
      this.levels = null;
      this.noData = true;
      this.currentPage = 0;
    }
  }

  First() {
    this.currentPage = 0;
    this.getPage()
  }

  Previous() {
    this.currentPage > 0 ? this.currentPage-- : this.currentPage
    this.getPage()
  }

  Next() {
    // this.currentPage < this.totalPages - 1 ? this.currentPage++ : this.currentPage
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++
      this.getPage()
    }
  }

  Last() {
    this.currentPage = this.totalPages - 1;
    this.getPage()
  }

}


