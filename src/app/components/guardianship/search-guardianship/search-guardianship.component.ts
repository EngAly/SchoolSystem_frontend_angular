import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Guardianship } from 'src/app/models/Guardianship';
import { GuardianshipService } from 'src/app/services/guardianship.service';

@Component({
  selector: 'app-search-guardianship',
  templateUrl: './search-guardianship.component.html',
  styleUrls: ['./search-guardianship.component.scss']
})
export class SearchGuardianshipComponent {

  name: string;
  items: Array<Guardianship> = [];
  inPrograss: boolean;
  currentPage: number = 0;
 

  checkName = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private service: GuardianshipService) {
  }

  get controls() {
    return this.checkName.controls;
  }

  searchByName() {
    this.inPrograss = true;
    this.service.getByName(this.name).subscribe(
      data => {
        this.items = data['content'];
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