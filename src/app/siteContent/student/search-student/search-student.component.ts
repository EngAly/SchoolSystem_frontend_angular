import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheObjectService } from 'src/app/services/cache-object.service';

@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.scss']
})
export class SearchStudentComponent {
  name: string;
  items: Array<Student> = [];
  inPrograss: boolean;

  // pages options
  currentPage: number;
  direction = "desc";
  sort: string;


  checkName = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private service: StudentService, private _cache: CacheObjectService, private route: Router, private activeRoute: ActivatedRoute) {
  }

  get controls() {
    return this.checkName.controls;
  }

  sortBy(sort: string) {
    this.sort = sort;
    if (this.items.length > 0) {
      this.direction = this.direction == 'desc' ? 'asc' : 'desc';
      this.service.getByName(this.name, this.currentPage, sort, this.direction).subscribe(
        data => {
          this.items = data['content'];
        },
        error => {
          console.log(error)
        });
    }
  }

  search() {
    this.inPrograss = true;
    this.service.getByName(this.name).subscribe(
      data => {
        console.log(data)
        this.items = data['content'];
        this.currentPage = data['pageable']['pageNumber'];
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

  getDetails(item: Student) {
    this._cache.setObject = item;
    this.route.navigate([item.id], { relativeTo: this.activeRoute })
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