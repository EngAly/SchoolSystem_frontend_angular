import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'src/app/models/Subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-search-subject',
  templateUrl: './search-subject.component.html',
  styleUrls: ['./search-subject.component.scss']
})
export class SearchSubjectComponent {

  name: string;
  items: Array<Subject> = [];
  inPrograss: boolean;
  currentPage: number = 0;
 

  checkName = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private service: SubjectService) {
  }

  get controls() {
    return this.checkName.controls;
  }

  search() {
    this.inPrograss = true;
    this.service.getByName(this.name).subscribe(
      data => {
        this.items = data;
        this.inPrograss = false;
      },
      error => {
        console.log(error)
      });
  }

  public clearResults() {
    if (this.name.length == 0) {
      this.items = null;
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